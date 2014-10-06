READY(function() {
	'use strict';

	var
	// store
	store = STORE('Fit'),

	// sizes
	sizes = {
		'Samsung GALAXY Note 4' : {
			width : 360,
			height : 615
		},
		'Apple iPhone 5' : {
			width : 320,
			height : 548
		},
		'Apple iPhone 4' : {
			width : 320,
			height : 460
		}
	},

	// panel
	panel,

	// iframe
	iframe,

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

	TABLE({
		style : {
			width : '100%'
		},
		c : TR({
			c : [TD({
				style : {
					width : 220,
					overflowY : 'scroll',
					verticalAlign : 'top'
				},
				c : [TEXTAREA({
					style : {
						width : '100%',
						border : 'none'
					},
					name : 'url',
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

				// menu
				UL({
					style : {
						padding : '10px 0'
					},
					c : RUN(function() {

						var
						// array
						array = [];

						EACH(sizes, function(size, name) {
							array.push(LI({
								style : {
									margin : 'auto',
									marginTop : 10,
									width : '90%',
									backgroundColor : '#fff',
									color : '#000',
									borderRadius : 10
								},
								c : DIV({
									style : {
										padding : 5,
										cursor : 'pointer'
									},
									c : [H3({
										c : name
									}), P({
										c : size.width + ' x ' + size.height
									})],
									on : {
										tap : function() {
											createDisplay(size.width, size.height);
										}
									}
								})
							}));
						});

						return array;
					})
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

	if (store.get('size') !== undefined) {
		createDisplay(store.get('size').width, store.get('size').height);
	}

	CLEAR_BOTH().appendTo(BODY);
});
