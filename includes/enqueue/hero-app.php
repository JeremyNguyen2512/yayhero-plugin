<?php

function yayhero_enqueue_hero_app()
{
    yayhero_register_entry();

    add_action('admin_head', 'yayhero_register_preload_modules');
}

function yayhero_register_entry()
{
    add_filter(
        'script_loader_tag',
        function ($tag, $handle, $src) {
            if (strpos($handle, 'module/yayhero/') !== false) {
                $str  = "type='module'";
                $str .= YAY_HERO_IS_DEVELOPMENT ? ' crossorigin' : '';
                $tag  = '<script ' . $str . ' src="' . $src . '" id="' . $handle . '-js"></script>';
            }
            return $tag;
        },
        10,
        3
    );

    $user_permission = current_user_can('manage_options') ? 'write' : 'read';

    wp_register_script("module/yayhero/main.tsx", "http://localhost:3000/main.tsx", ['react', 'react-dom'], null, true); // phpcs:ignore WordPress.WP.EnqueuedResourceParameters.MissingVersion
    wp_enqueue_script("module/yayhero/main.tsx");
    wp_localize_script("module/yayhero/main.tsx", "yayHeroData", [
        'isRtl' => is_rtl(),
    ]);
    wp_localize_script("module/yayhero/main.tsx", 'appLocalize', [
        'hero_nonce'        => wp_create_nonce('wp_rest'),
        'api_url'           => get_rest_url(),
        'user_permission'   => $user_permission,
    ]);
}

function yayhero_register_preload_modules()
{
    echo '<script type="module">
        import RefreshRuntime from "http://localhost:3000/@react-refresh"
        RefreshRuntime.injectIntoGlobalHook(window)
        window.$RefreshReg$ = () => {}
        window.$RefreshSig$ = () => (type) => type
        window.__vite_plugin_react_preamble_installed__ = true
        </script>';
}
