<?php

/**
 * This file will create custom post type
 */

if (!class_exists('WP_Create_Custom_Post_Type')) {
    class WP_Create_Custom_Post_Type
    {

        public function __construct()
        {
            add_action('init', [$this, 'register_yay_hero']);
        }

        public function register_yay_hero()
        {

            $labels = array(
                'name'                  => _x('Yay Hero', 'Post Type General Name', 'yayhero'),
                'singular_name'         => _x('Yay Hero', 'Post Type Singular Name', 'yayhero'),
                'menu_name'             => __('Yay Hero', 'yayhero'),
                'name_admin_bar'        => __('Yay Hero', 'yayhero'),
                'archives'              => __('Item Archives', 'yayhero'),
                'attributes'            => __('Item Attributes', 'yayhero'),
                'parent_item_colon'     => __('Parent Item:', 'yayhero'),
                'all_items'             => __('All Items', 'yayhero'),
                'add_new_item'          => __('Add New Item', 'yayhero'),
                'add_new'               => __('Add New', 'yayhero'),
                'new_item'              => __('New Item', 'yayhero'),
                'edit_item'             => __('Edit Item', 'yayhero'),
                'update_item'           => __('Update Item', 'yayhero'),
                'view_item'             => __('View Item', 'yayhero'),
                'view_items'            => __('View Items', 'yayhero'),
            );
            $args = array(
                'label'                 => __('Yay Hero', 'yayhero'),
                'description'           => __('Post Type Description', 'yayhero'),
                'labels'                => $labels,
                'supports'              => array('title'),
                'hierarchical'          => false,
                'public'                => true,
                'show_ui'               => false,
                'show_in_menu'          => false,
                'menu_position'         => 5,
                'show_in_admin_bar'     => false,
                'show_in_nav_menus'     => false,
                'can_export'            => true,
                'has_archive'           => true,
                'exclude_from_search'   => false,
                'publicly_queryable'    => true,
                'capability_type'       => 'page',
            );
            register_post_type('yay_hero', $args);
        }
    }
    new  WP_Create_Custom_Post_Type();
}
