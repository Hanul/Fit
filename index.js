READY(function() {
	'use strict';

	var
	// store
	store = STORE('Fit'),

	// list
	list,

	// panel
	panel,

	// iframe
	iframe,

	// add size.
	addSize = function(width, height) {

		var
		// item
		item = LI({
			style : {
				margin : 'auto',
				marginTop : 10,
				width : '90%',
				backgroundColor : '#fff',
				color : '#000',
				borderRadius : 10
			},
			c : [H3({
				style : {
					flt : 'left',
					padding : '5px 10px',
					cursor : 'pointer'
				},
				c : width + ' x ' + height,
				on : {
					tap : function() {
						createDisplay(width, height);
					}
				}
			}), A({
				style : {
					flt : 'right',
					padding : '7px 10px',
					fontSize : 12,
					color : '#999'
				},
				c : 'REMOVE',
				on : {
					tap : function() {

						REMOVE(sizes, function(size) {
							if (size.width === width && size.height === height) {
								return true;
							}
						});

						store.save({
							name : 'sizes',
							value : sizes
						});

						item.remove();
					}
				}
			}), CLEAR_BOTH()]
		}).appendTo(list);
	},

	// enter.
	enter = function(url) {

		if (iframe !== undefined) {
			iframe.setSrc(url);
		}

		store.save({
			name : 'url',
			value : url
		});
	},

	// create display.
	createDisplay = function(width, height) {

		panel.empty();
		panel.append( iframe = IFRAME({
			style : {
				width : width,
				height : height
			}
		}));

		enter(store.get('url'));

		store.save({
			name : 'size',
			value : {
				width : width,
				height : height
			}
		});
	};

	if (store.get('sizes') === undefined) {
		store.save({
			name : 'sizes',
			value : sizes
		});
	}

	global.sizes = store.get('sizes');

	TABLE({
		style : {
			width : '100%'
		},
		c : TR({
			c : [TD({
				style : {
					width : 220,
					verticalAlign : 'top'
				},
				c : [TEXTAREA({
					style : {
						width : '100%',
						border : 'none'
					},
					name : 'url',
					placeholder : 'URL',
					value : store.get('url'),
					on : {
						keyup : function(e, input) {
							if (input.getValue() !== '') {
								enter(input.getValue());
							}
						}
					}
				}), H2({
					style : {
						marginTop : 20,
						textAlign : 'center'
					},
					c : 'Browser Size'
				}),

				// list
				list = UL({
					style : {
						padding : '10px 0 0 0'
					}
				}),

				// add button
				A({
					style : {
						padding : 20,
						paddingBottom : 0,
						display : 'block',
						textAlign : 'center',
						fontSize : 12
					},
					c : 'ADD SIZE',
					on : {
						tap : function() {

							var
							// width
							width = INTEGER(prompt('width')),

							// height
							height = INTEGER(prompt('height'));

							if (width !== undefined && height !== undefined && CHECK_IS_IN({
								array : sizes,
								value : {
									width : width,
									height : height
								}
							}) !== true) {

								sizes.push({
									width : width,
									height : height
								});

								store.save({
									name : 'sizes',
									value : sizes
								});

								addSize(width, height);

								createDisplay(width, height);
							}
						}
					}
				}), A({
					style : {
						display : 'block',
						padding : 20,
						fontSize : 12,
						color : '#999',
						textDecoration : 'none'
					},
					c : 'by Hanul',
					href : 'https://github.com/Hanul',
					target : '_blank'
				})]
			}), panel = TD({
				style : {
					textAlign : 'center',
					backgroundColor : '#000'
				},
				c : 'Select display size'
			})]
		})
	}).appendTo(BODY);

	EACH(sizes, function(size) {
		addSize(size.width, size.height);
	});

	if (store.get('size') !== undefined) {
		createDisplay(store.get('size').width, store.get('size').height);
	}

	CLEAR_BOTH().appendTo(BODY);
});
