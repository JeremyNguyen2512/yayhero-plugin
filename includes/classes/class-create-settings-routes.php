<?php 
/**
 * This file will create react setting routes
 */
if(!class_exists('WP_Create_React_Settings_Routes')){

    class WP_Create_React_Settings_Routes{
        public function __construct()
        {
            add_action('rest_api_init', [$this,'create_rest_route']);
        }
    
        public function create_rest_route(){
            register_rest_route('yayhero/v1', '/heroes/list', [
                'method' => 'GET',
                'callback' => [$this, 'get_list_hero']
            ]);

            register_rest_route( 'yayhero/v1', '/heroes/add', array(
                'methods' => 'POST',
                'callback' => [$this, 'add_hero'],
            ) );

            register_rest_route( 'yayhero/v1', '/heroes/delete/(?P<heroid_param>\d+)', array(
                'methods' => 'DELETE',
                'callback' => [$this, 'delete_hero'],
            ) );

        }

        public function get_list_hero(){
           
            $args =  array(
                'post_type'     =>'yay_hero',
                'post_status'   =>'publish',
            );
            $hero_posts = new WP_Query( $args );
            $data_hero = array();
            if ( $hero_posts->have_posts() ):
                while($hero_posts -> have_posts()): $hero_posts->the_post();
                    $heroID = get_the_ID();
                    $data = array(
                        'key'           =>$heroID,
                        'id'            =>$heroID,
                        'name'          =>get_the_title(),
                        'class'         =>get_post_meta($heroID, 'class', true),
                        'level'         =>get_post_meta($heroID, 'level', true),
                        'attributes'    =>get_post_meta($heroID, 'attributes', true),
                    );

                    array_push($data_hero, $data);
                endwhile;
                wp_reset_postdata();
            endif;
            
            return rest_ensure_response($data_hero) ;
            
        }

        public function add_hero($reg){
                $args = array(
                    'post_type'     =>'yay_hero',
                    'post_status'   =>'publish',
                    'post_title'    =>$reg['name'],
                );
                $post_id = wp_insert_post($args);
    
                if($post_id > 0){
                    add_post_meta($post_id, 'class', $reg['class']);
                    add_post_meta($post_id, 'level', $reg['level']);
                    add_post_meta($post_id, 'attributes',$reg['attributes']);
                }
                $status = 'success';
                $mess = 'HeroID is '. $post_id;
            
            return new WP_REST_Response(array('status'=> $status, 'mess'=>$mess));
        }

        public function update_hero($reg){

        }

        public function delete_hero($request){
            // $hero_ids = array(110);
            // foreach($hero_ids as $post_id){
            //     $meta_ids = get_post_meta($post_id);
            //     foreach ( $meta_ids as $meta_key => $meta_id ) {
            //         delete_post_meta( $post_id, $meta_key, $meta_id[0] );
            //     }
            //     wp_delete_post( $post_id, true );
            // }
            $respon = $request->get_param('heroid_param');
            return new WP_REST_Response('Deleted hero '.$respon);
        }
    }

    new WP_Create_React_Settings_Routes();
}