<?php

function yayhero_add_admin_page()
{
    add_menu_page(
        __('Heroes', 'yayhero'),
        __('Heroes', 'yayhero'),
        'manage_options',
        'yayhero/yayhero-admin.php',
        'yayhero_render_admin_page',
        'dashicons-shield',
        30
    );
}

function yayhero_render_admin_page()
{
    include YAY_HERO_PLUGIN_PATH . 'templates/pages/hero-admin.php';
}

function yayhero_enqueue_admin_page($hook_suffix)
{
    if ('toplevel_page_yayhero/yayhero-admin' !== $hook_suffix) {
        return;
    }

    yayhero_enqueue_hero_app();
}

add_action('admin_menu', 'yayhero_add_admin_page');
add_action('admin_enqueue_scripts', 'yayhero_enqueue_admin_page');
