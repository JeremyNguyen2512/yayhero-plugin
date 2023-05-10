<?php

/**
 * This file will create react setting routes
 */
if (!class_exists('YHR_REST_API')) {

    class YHR_REST_API
    {
        public function __construct()
        {
            add_action('rest_api_init', [$this, 'create_rest_route']);
        }

        public function create_rest_route()
        {
            register_rest_route('yayhero/v1', '/heroes', [
                'method'                => 'GET',
                'callback'              => [$this, 'get_list_hero'],
                'permission_callback'   => [$this, 'get_hero_permission'],
            ]);

            register_rest_route('yayhero/v1', '/heroes', array(
                'methods' => 'POST',
                'callback' => [$this, 'add_hero'],
                'permission_callback'   => [$this, 'update_hero_permission'],
            ));

            register_rest_route('yayhero/v1', '/heroes/(?P<heroid_param>\d+)', array(
                'methods' => 'DELETE',
                'callback' => [$this, 'delete_hero'],
                'permission_callback'   => [$this, 'update_hero_permission'],
            ));

            register_rest_route('yayhero/v1', '/heroes/(?P<heroid_param>\d+)', array(
                'methods' => 'PUT',
                'callback' => [$this, 'update_hero'],
                'permission_callback'   => [$this, 'update_hero_permission'],
            ));

            register_rest_route('yayhero/v1', '/heroes/(?P<heroid_param>\d+)/update-level', array(
                'methods' => 'PUT',
                'callback' => [$this, 'update_hero_level'],
                'permission_callback'   => [$this, 'update_hero_permission'],
            ));

            register_rest_route('yayhero/v1', '/heroes/(?P<heroid_param>\d+)', array(
                'methods' => 'GET',
                'callback' => [$this, 'get_single_hero'],
                'permission_callback'   => [$this, 'get_hero_permission'],
            ));
        }

        public function get_list_hero($request)
        {
            $posts_per_page = (int)$request['posts_per_page'];
            $paged = (int)$request['paged'];

            $args =  array(
                'post_type'     => 'yay_hero',
                'post_status'   => 'publish',
                'posts_per_page' => $posts_per_page,
                'paged'         => $paged
            );
            $hero_posts = new WP_Query($args);
            $total_data = $hero_posts->found_posts;
            $data_hero = array();
            if ($hero_posts->have_posts()) :
                while ($hero_posts->have_posts()) : $hero_posts->the_post();
                    $heroID = get_the_ID();
                    $data = array(
                        'key'           => $heroID,
                        'id'            => $heroID,
                        'name'          => get_the_title(),
                        'class'         => get_post_meta($heroID, 'class', true),
                        'level'         => (int)get_post_meta($heroID, 'level', true),
                        'attributes'    => get_post_meta($heroID, 'attributes', true),
                    );

                    array_push($data_hero, $data);
                endwhile;
                wp_reset_postdata();
            endif;

            return new WP_REST_Response(array('hero_data' => $data_hero, 'total_data' => $total_data));
        }

        public function get_single_hero($request)
        {
            $hero_id = $request->get_param('heroid_param');
            $hero_post = get_post($hero_id);
            if (empty($hero_post)) {
                return new WP_Error('not_found', 'Hero Not Found', array('status' => 404));
            }

            return array(
                'key'           => $hero_id,
                'id'            => $hero_id,
                'name'          => get_the_title($hero_id),
                'class'         => get_post_meta($hero_id, 'class', true),
                'level'         => get_post_meta($hero_id, 'level', true),
                'attributes'    => get_post_meta($hero_id, 'attributes', true),
            );
        }

        public function add_hero($request)
        {
            $newAttributes = array();
            $attributes = $request['attributes'];
            if (is_array($attributes)) {
                foreach ($attributes as $attribute => $value) {
                    switch ($attribute) {
                        case 'strength':
                        case 'dexterity':
                        case 'intelligence':
                        case 'vitality':
                            $sanitizeValue = sanitize_text_field($value);
                            $newAttributes[$attribute] = $sanitizeValue;
                            break;
                    }
                }
            }
            $args = array(
                'post_type'     => 'yay_hero',
                'post_status'   => 'publish',
                'post_title'    => sanitize_text_field($request['name']),
            );
            $post_id = wp_insert_post($args);

            if ($post_id > 0) {
                add_post_meta($post_id, 'class', sanitize_text_field($request['class']));
                add_post_meta($post_id, 'level', sanitize_text_field($request['level']));
                add_post_meta($post_id, 'attributes', $newAttributes);
            }
            return new WP_REST_Response($post_id);
        }

        public function update_hero($request)
        {
            $newAttributes = array();
            $attributes = $request['attributes'];
            if (is_array($attributes)) {
                foreach ($attributes as $attribute => $value) {
                    switch ($attribute) {
                        case 'strength':
                        case 'dexterity':
                        case 'intelligence':
                        case 'vitality':
                            $sanitizeValue = sanitize_text_field($value);
                            $newAttributes[$attribute] = $sanitizeValue;
                            break;
                    }
                }
            }

            $hero_id = $request->get_param('heroid_param');
            $args = array(
                'ID'            => $hero_id,
                'post_type'     => 'yay_hero',
                'post_status'   => 'publish',
                'post_title'    => sanitize_text_field($request['name']),
            );

            $post_id =  wp_update_post($args);
            update_post_meta($post_id, 'class', sanitize_text_field($request['class']));
            update_post_meta($post_id, 'level', sanitize_text_field($request['level']));
            update_post_meta($post_id, 'attributes', $newAttributes);

            $data = array(
                'id'            => $post_id,
                'name'          => get_the_title($post_id),
                'class'         => get_post_meta($post_id, 'class', true),
                'level'         => get_post_meta($post_id, 'level', true),
                'attributes'    => get_post_meta($post_id, 'attributes', true),
            );

            return new WP_REST_Response($data);
        }

        public function update_hero_level($request)
        {
            $hero_level = $request['level'];
            $hero_id = $request->get_param('heroid_param');

            $hero_post = get_post($hero_id);
            if (empty($hero_post)) {
                return new WP_Error('not_found', 'Hero Not Found', array('status' => 404));
            }

            update_post_meta($hero_id, 'level', $hero_level);
            return array(
                'key'           => $hero_id,
                'id'            => $hero_id,
                'name'          => get_the_title($hero_id),
                'class'         => get_post_meta($hero_id, 'class', true),
                'level'         => get_post_meta($hero_id, 'level', true),
                'attributes'    => get_post_meta($hero_id, 'attributes', true),
            );
        }

        public function delete_hero($request)
        {
            $hero_id = $request->get_param('heroid_param');

            $result = wp_delete_post($hero_id, true);
            if (null === $result || false === $result) {
                return new WP_Error(
                    'cant_delete',
                    __('Something went wrong', 'yay_hero'),
                    array('status' => 500)
                );
            }

            return new WP_REST_Response($hero_id);
        }

        public function get_hero_permission()
        {
            return current_user_can('read');
        }

        public function update_hero_permission()
        {
            return current_user_can('manage_options');
        }
    }

    new YHR_REST_API();
}
