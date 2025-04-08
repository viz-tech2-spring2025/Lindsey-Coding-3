
		// using d3 for convenience
		var container = d3.select("#scroll");
		var figure = container.select("figure");
		var article = container.select("article");
		var step = article.selectAll(".step");

		// initialize the scrollama
		var scroller = scrollama();

		// generic window resize listener event
		function handleResize() {
			// 1. update height of step elements
			var stepHeight = Math.floor(window.innerHeight * 0.75);
			step.style("height", stepHeight + "px");

			// 2. update width/height of graphic element
			var bodyWidth = d3.select("body").node().offsetWidth;

			var figureHeight = Math.floor(window.innerHeight * 0.5);
			figure.style("height", figureHeight + "px");
			// 3. tell scrollama to update new element dimensions
			scroller.resize();
		}

		// scrollama event handlers
		// function handleStepEnter(response) {
		// 	console.log(response);
		// 	// response = { element, direction, index }

		// 	// add color to current step only
		// 	step.classed("is-active", function (d, i) {
		// 		return i === response.index;
		// 	});

		// 	// update graphic based on step
		// 	figure.select("p").text(response.index + 1);
		// }


        //new handleStepEnter function
        function handleStepEnter(response) {
            console.log(response);
            // response = { element, direction, index }
        
            // add color to current step only
            step.classed("is-active", function (d, i) {
                return i === response.index;
            });
        
            // update graphic based on step (this still controls the number shown in <p>, if you're using that)
            figure.select("p").text(response.index + 1);
        
            // NEW: change the image inside the figure
            const mainImage = document.getElementById("main-image");
        
            if (response.index === 0) {
                mainImage.src = "hurricane-scale.svg";
            } else if (response.index === 1) {
                mainImage.src = "cat5.svg";
            } else if (response.index === 2) {
                mainImage.src = "storm-surge.svg";
            } else if (response.index === 3) {
                mainImage.src = "hurricane-scale.svg";
            }
            
        }
        


		function init() {
			// 1. force a resize on load to ensure proper dimensions are sent to scrollama
			handleResize();

			// 2. setup the scroller passing options
			// this will also initialize trigger observations
			// 3. bind scrollama event handlers (this can be chained like below)
			scroller
				.setup({
					step: "article .step",
					debug: false, // turn on lines to see scrolling
					offset: 0.75
				})
				.onStepEnter(handleStepEnter);

			// setup resize event
			window.addEventListener("resize", handleResize);
		}

		// kick things off
		init();
