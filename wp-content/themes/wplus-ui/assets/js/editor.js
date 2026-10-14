/**
 * Gives blocks that use a WPlus UI block style the same component classes in the
 * editor as on the front end, so the theme stylesheet previews them.
 */
( function ( wp ) {
	var map = window.wplusuiBlockClasses || {};
	var createHigherOrderComponent = wp.compose.createHigherOrderComponent;
	var el = wp.element.createElement;

	wp.hooks.addFilter(
		'editor.BlockListBlock',
		'wplusui/component-classes',
		createHigherOrderComponent( function ( BlockListBlock ) {
			return function ( props ) {
				var styles = map[ props.name ];
				var className = props.attributes && props.attributes.className ? props.attributes.className : '';
				if ( styles && className ) {
					Object.keys( styles ).forEach( function ( key ) {
						if ( ( ' ' + className + ' ' ).indexOf( ' ' + key + ' ' ) !== -1 ) {
							props = Object.assign( {}, props, { className: ( props.className ? props.className + ' ' : '' ) + styles[ key ] } );
						}
					} );
				}
				return el( BlockListBlock, props );
			};
		}, 'withWPlusUIClasses' )
	);
}( window.wp ) );

/**
 * Editable blocks for Tabs, Download box, Table of contents and lazy YouTube,
 * extra attributes for the Code block, and the inline "Mark" format used in code samples.
 */
( function ( wp ) {
	var el = wp.element.createElement;
	var Fragment = wp.element.Fragment;
	var __ = wp.i18n.__;
	var registerBlockType = wp.blocks.registerBlockType;
	var be = wp.blockEditor;
	var c = wp.components;
	var InnerBlocks = be.InnerBlocks;
	var InspectorControls = be.InspectorControls;
	var useBlockProps = be.useBlockProps;
	var ServerSideRender = wp.serverSideRender;

	function preview( name, attributes ) {
		return el( ServerSideRender, { block: name, attributes: attributes } );
	}

	registerBlockType( 'wplusui/tabs', {
		apiVersion: 3,
		edit: function ( props ) {
			var a = props.attributes;
			return el(
				Fragment,
				null,
				el(
					InspectorControls,
					null,
					el(
						c.PanelBody,
						{ title: __( 'Tabs', 'wplus-ui' ) },
						el( c.SelectControl, {
							label: __( 'Style', 'wplus-ui' ),
							value: a.variant,
							options: [
								{ label: __( 'Tabs', 'wplus-ui' ), value: 'default' },
								{ label: __( 'Code tabs (use Code blocks inside)', 'wplus-ui' ), value: 'code' },
							],
							onChange: function ( v ) {
								props.setAttributes( { variant: v } );
							},
						} ),
						el( c.ToggleControl, {
							label: __( 'Keep the tab bar visible while scrolling', 'wplus-ui' ),
							checked: !! a.sticky,
							onChange: function ( v ) {
								props.setAttributes( { sticky: v } );
							},
						} )
					)
				),
				el(
					'div',
					useBlockProps( { className: 'wplusui-tabs-editor' } ),
					el( InnerBlocks, {
						allowedBlocks: [ 'wplusui/tab' ],
						template: [
							[ 'wplusui/tab', { title: __( 'Tab 1', 'wplus-ui' ) } ],
							[ 'wplusui/tab', { title: __( 'Tab 2', 'wplus-ui' ) } ],
						],
						renderAppender: InnerBlocks.ButtonBlockAppender,
					} )
				)
			);
		},
		save: function () {
			return el( InnerBlocks.Content );
		},
	} );

	registerBlockType( 'wplusui/tab', {
		apiVersion: 3,
		edit: function ( props ) {
			return el(
				'div',
				useBlockProps( { className: 'wplusui-tab-editor', style: { border: '1px dashed #c3c4c7', padding: '8px', margin: '8px 0' } } ),
				el( c.TextControl, {
					label: __( 'Tab title', 'wplus-ui' ),
					value: props.attributes.title,
					onChange: function ( v ) {
						props.setAttributes( { title: v } );
					},
				} ),
				el( InnerBlocks, { renderAppender: InnerBlocks.ButtonBlockAppender } )
			);
		},
		save: function () {
			return el( InnerBlocks.Content );
		},
	} );

	function textField( props, key, label ) {
		return el( c.TextControl, {
			label: label,
			value: props.attributes[ key ],
			onChange: function ( v ) {
				var o = {};
				o[ key ] = v;
				props.setAttributes( o );
			},
		} );
	}

	registerBlockType( 'wplusui/download', {
		apiVersion: 3,
		edit: function ( props ) {
			return el(
				Fragment,
				null,
				el(
					InspectorControls,
					null,
					el(
						c.PanelBody,
						{ title: __( 'File', 'wplus-ui' ) },
						textField( props, 'type', __( 'File type label (zip, pdf…)', 'wplus-ui' ) ),
						textField( props, 'name', __( 'File name', 'wplus-ui' ) ),
						textField( props, 'size', __( 'File size', 'wplus-ui' ) ),
						textField( props, 'url', __( 'Download URL', 'wplus-ui' ) )
					)
				),
				el( 'div', useBlockProps(), preview( 'wplusui/download', props.attributes ) )
			);
		},
		save: function () {
			return null;
		},
	} );

	registerBlockType( 'wplusui/toc', {
		apiVersion: 3,
		edit: function ( props ) {
			return el(
				Fragment,
				null,
				el(
					InspectorControls,
					null,
					el(
						c.PanelBody,
						{ title: __( 'Table of contents', 'wplus-ui' ) },
						textField( props, 'title', __( 'Title (empty = default)', 'wplus-ui' ) ),
						el( c.ToggleControl, {
							label: __( 'Open by default', 'wplus-ui' ),
							checked: props.attributes.open !== false,
							onChange: function ( v ) {
								props.setAttributes( { open: v } );
							},
						} )
					)
				),
				el( 'div', useBlockProps(), el( c.Placeholder, { label: __( 'Table of contents', 'wplus-ui' ), instructions: __( 'Built from the headings of the post when the page loads.', 'wplus-ui' ) } ) )
			);
		},
		save: function () {
			return null;
		},
	} );

	registerBlockType( 'wplusui/youtube', {
		apiVersion: 3,
		edit: function ( props ) {
			var id = props.attributes.videoId;
			return el(
				Fragment,
				null,
				el(
					InspectorControls,
					null,
					el(
						c.PanelBody,
						{ title: __( 'Video', 'wplus-ui' ) },
						textField( props, 'videoId', __( 'YouTube video ID', 'wplus-ui' ) ),
						textField( props, 'ratio', __( 'Aspect ratio (default 16 / 9)', 'wplus-ui' ) )
					)
				),
				el(
					'div',
					useBlockProps(),
					id
						? el( 'div', { style: { aspectRatio: props.attributes.ratio || '16 / 9', background: '#000 center/cover url(https://i.ytimg.com/vi/' + encodeURIComponent( id ) + '/hqdefault.jpg)' } } )
						: el( c.Placeholder, { label: __( 'Lazy YouTube', 'wplus-ui' ), instructions: __( 'Enter the video ID in the block settings.', 'wplus-ui' ) } )
				)
			);
		},
		save: function () {
			return null;
		},
	} );

	// Code block: optional file label and comment shown in the sample's header.
	wp.hooks.addFilter( 'blocks.registerBlockType', 'wplusui/code-attributes', function ( settings, name ) {
		if ( name !== 'core/code' ) {
			return settings;
		}
		settings.attributes = Object.assign( {}, settings.attributes, {
			wplusuiSource: { type: 'string', source: 'attribute', selector: 'pre', attribute: 'data-source' },
			wplusuiComment: { type: 'string', source: 'attribute', selector: 'pre', attribute: 'data-comment' },
		} );
		return settings;
	} );
	wp.hooks.addFilter( 'blocks.getSaveContent.extraProps', 'wplusui/code-save', function ( props, blockType, attributes ) {
		if ( blockType.name === 'core/code' ) {
			if ( attributes.wplusuiSource ) {
				props[ 'data-source' ] = attributes.wplusuiSource;
			}
			if ( attributes.wplusuiComment ) {
				props[ 'data-comment' ] = attributes.wplusuiComment;
			}
		}
		return props;
	} );
	wp.hooks.addFilter(
		'editor.BlockEdit',
		'wplusui/code-controls',
		wp.compose.createHigherOrderComponent( function ( BlockEdit ) {
			return function ( props ) {
				if ( props.name !== 'core/code' ) {
					return el( BlockEdit, props );
				}
				return el(
					Fragment,
					null,
					el( BlockEdit, props ),
					el(
						InspectorControls,
						null,
						el(
							c.PanelBody,
							{ title: __( 'Code sample header', 'wplus-ui' ), initialOpen: false },
							textField( props, 'wplusuiSource', __( 'File name (e.g. src/index.html)', 'wplus-ui' ) ),
							textField( props, 'wplusuiComment', __( 'Comment (e.g. .html)', 'wplus-ui' ) )
						)
					)
				);
			};
		}, 'withWPlusUICodeControls' )
	);

	// Inline "Mark" format for code samples: <mark class="block purple" data-before="label">.
	var presets = [
		[ __( 'Mark', 'wplus-ui' ), '' ],
		[ __( 'Mark: block', 'wplus-ui' ), 'block' ],
		[ __( 'Mark: purple', 'wplus-ui' ), 'purple' ],
		[ __( 'Mark: block purple', 'wplus-ui' ), 'block purple' ],
		[ __( 'Mark: blue', 'wplus-ui' ), 'blue' ],
		[ __( 'Mark: green block', 'wplus-ui' ), 'green block' ],
		[ __( 'Mark: red', 'wplus-ui' ), 'red' ],
		[ __( 'Mark: orange', 'wplus-ui' ), 'orange' ],
		[ __( 'Mark: gray', 'wplus-ui' ), 'gray' ],
	];
	wp.richText.registerFormatType( 'wplusui/mark', {
		title: __( 'Code mark', 'wplus-ui' ),
		tagName: 'mark',
		className: null,
		attributes: { markClass: 'class', markBefore: 'data-before', markAfter: 'data-after' },
		edit: function ( props ) {
			var active = props.isActive;
			var controls = presets.map( function ( p ) {
				return {
					title: p[ 0 ],
					onClick: function () {
						var attrs = {};
						if ( p[ 1 ] ) {
							attrs.markClass = p[ 1 ];
						}
						props.onChange( wp.richText.applyFormat( props.value, { type: 'wplusui/mark', attributes: attrs } ) );
					},
				};
			} );
			controls.push( {
				title: __( 'Set label…', 'wplus-ui' ),
				onClick: function () {
					var label = window.prompt( __( 'Label shown before the marked text', 'wplus-ui' ) );
					if ( label !== null ) {
						props.onChange( wp.richText.applyFormat( props.value, { type: 'wplusui/mark', attributes: { markBefore: label } } ) );
					}
				},
			} );
			controls.push( {
				title: __( 'Remove mark', 'wplus-ui' ),
				onClick: function () {
					props.onChange( wp.richText.removeFormat( props.value, 'wplusui/mark' ) );
				},
			} );
			return el( be.BlockControls, null, el( c.ToolbarGroup, null, el( c.DropdownMenu, { icon: 'editor-code', label: __( 'Code mark', 'wplus-ui' ), controls: controls, className: active ? 'is-pressed' : '' } ) ) );
		},
	} );
}( window.wp ) );
