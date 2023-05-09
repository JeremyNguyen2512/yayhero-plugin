<?php

/**
 * This file will check user role permission 
 */

if (!class_exists('WP_Check_User_Role_Permission')) {
    class WP_Check_User_Role_Permission
    {
        public function __construct()
        {
            $user_permission = current_user_can('manage_options') ? 'write' : 'read';
            wp_localize_script("module/yayhero/main.tsx", 'appLocalize', [
                'user_permission'    => $user_permission,
            ]);
        }
    }
    new WP_Check_User_Role_Permission();
}
