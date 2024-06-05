<?php
class AIBHelloBlock{
	public function __construct(){
		add_action( 'init', [$this, 'onInit'] );
	}
	function onInit() {
		wp_register_style( 'aib-hello-style', AIB_DIR_URL . 'dist/style.css', [ ], AIB_VERSION ); // Style
		wp_register_style( 'aib-hello-editor-style', AIB_DIR_URL . 'dist/editor.css', [ 'aib-hello-style' ], AIB_VERSION ); // Backend Style

		register_block_type( __DIR__, [
			'editor_style'		=> 'aib-hello-editor-style',
			'render_callback'	=> [$this, 'render']
		] ); // Register Block

		wp_set_script_translations( 'aib-hello-editor-script', 'advanced-image', AIB_DIR_PATH . 'languages' );
	}

	function render( $attributes ){
		extract( $attributes );

		wp_enqueue_style( 'aib-hello-style' );
		wp_enqueue_script( 'aib-hello-script', AIB_DIR_URL . 'dist/script.js', [ 'react', 'react-dom' ], AIB_VERSION, true );
		wp_set_script_translations( 'aib-hello-script', 'advanced-image', AIB_DIR_PATH . 'languages' );

		$className = $className ?? '';
		$blockClassName = "wp-block-aib-hello $className align$align";
		
		ob_start(); ?>
<div class='<?php echo esc_attr( $blockClassName ); ?>' id='aibHelloBlock-<?php echo esc_attr( $cId ) ?>'
  data-attributes='<?php echo esc_attr( wp_json_encode( $attributes ) ); ?>'></div>

<?php return ob_get_clean();
	}
	
}
new AIBHelloBlock();