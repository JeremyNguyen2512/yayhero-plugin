
<?php

/**
 * Plugin Name:     Train Yay Hero
 * Plugin URI:      https://yaycommerce.com/
 * Description:     Starter plugin. Training basic WordPress plugin development.
 * Author:          Yay Commerce
 * Author URI:      https://yaycommerce.com/
 * Text Domain:     yayhero
 * Domain Path:     /languages
 * Version:         1.0.0.3
 *
 * @package Yayhero
 */

if (!defined('ABSPATH')) {
    die('We\'re sorry, but you can not directly access this file.');
}

define('YAY_HERO_PLUGIN_PATH', plugin_dir_path(__FILE__));
define('YAY_HERO_PLUGIN_URL', plugin_dir_url(__FILE__));
define('YAY_HERO_IS_DEVELOPMENT', true);
define('YAY_HERO_HOME_URL', home_url());

if (!wp_installing()) {

    add_action(
        'plugins_loaded',
        function () {
            include YAY_HERO_PLUGIN_PATH . 'includes/pages/hero-admin.php';
            include YAY_HERO_PLUGIN_PATH . 'includes/enqueue/hero-app.php';
            include YAY_HERO_PLUGIN_PATH . 'includes/classes/class-create-settings-routes.php';
            include YAY_HERO_PLUGIN_PATH . 'includes/classes/class-create-custom-post-type.php';
        }
    );
}

/**
 * Add style to admin plugin
 */
add_action('admin_enqueue_scripts', 'yayheros_admin_enqueue_scripts');
function yayheros_admin_enqueue_scripts(){
    wp_enqueue_style( 'yayheroes-style', YAY_HERO_PLUGIN_URL . 'assets/admin.css' );
}
