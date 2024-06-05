<?php
/**
 * Plugin Name: Advanced-image
 * Description: Description of the Advanced-image.
 * Version: 1.0.0
 * Author: bPlugins LLC
 * Author URI: http://bplugins.com
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain: advanced-image
 */

// ABS PATH
if ( !defined( 'ABSPATH' ) ) { exit; }

// Constant
define( 'AIB_VERSION', isset( $_SERVER['HTTP_HOST'] ) && 'localhost' === $_SERVER['HTTP_HOST'] ? time() : '1.0.0' );
define( 'AIB_DIR_URL', plugin_dir_url( __FILE__ ) );
define( 'AIB_DIR_PATH', plugin_dir_path( __FILE__ ) );



require_once AIB_DIR_PATH . 'inc/block.php';