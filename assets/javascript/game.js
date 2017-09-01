$(document).ready(function()
	{

	// Initial array of gifs
	var topics = ["Ron Swanson", "Funny Star Wars", "Trump", "NBA"];

// =================================================================================
// GIF BUTTON CREATE ////////////////////////////////////////////////////////////////
// ================================================================================= 	 	
	// A function to create a button for each search term
	function renderButtons() 
		{
	  // Remove currently existing buttons to avoid repeat buttons
		$("#buttons-view").empty();
		
		// Looping through array of gifs
		for (var j = 0; j < topics.length; j++) 
			{
			
			// Create a button for each gif in the array
			var a = $("<button id=gifButtons>");
			
			// Adding a class of "gif" to the gif buttons
			a.addClass("gif");
			
			// Adding a data-attribute with the array as its value
			a.attr("data-name", topics[j]);
			
			// Make the existing "topics" as the text inside each gif button
			a.text(topics[j]);
			
			// Adding the button to the buttons-view div
			$("#buttons-view").append(a);
			
			//Empty the search bar after hitting search and creating the button.
			$("#gif-input").val("",);
			}
		}

// =================================================================================
// GIF BUTTON CLICK ////////////////////////////////////////////////////////////////
// ================================================================================= 	     
	// Function handles the reponse to the gif button being clicked
	$("#add-gif").on("click", function gifButtonClick(event) 
		{
		event.preventDefault();
	  
		// Grab search input
		var gif = $("#gif-input").val().trim();
		
		// If search input is blank, do not create a new button
		if (gif === "")
			{
			renderButtons()
			}
		
		// If not blank:
		else
			{
		// Add search input into topics array
			topics.push(gif);
	  
	  // Create a button for all topics in the array(including new topic)
			renderButtons();
			
			}
		});
	      	
	// Adding a click event listener to all elements with a class of "gif"
	$(document).on("click", ".gif", displayGifInfo);
	      
	// Run renderButtons function to display the intial buttons
	renderButtons();

// =================================================================================
// DISPLAY GIFS ////////////////////////////////////////////////////////////////////
// =================================================================================

	// function to pull gifs from GIPHY api and display the html results
	function displayGifInfo() 
		{
	  	var gif = $(this).attr("data-name");
	  	var apiKey = "a4ccf65cb57740069f952abd8f4ec36c";
	  	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
	        gif + "&api_key=" + apiKey + "&limit=10";

// PULL DATA =======================================================================  
	  // AJAX call triggered when the specific gif button is clicked
	  	$.ajax(
	   		{
	   		url: queryURL,
	   		method: "GET"    
	  		})
	  		.done(function(response) 
	  			{
	  			console.log(response);

// LOOP THROUGH ARRAY ==============================================================
								
				var results = response.data;
				
				//Message to appear if no results are found in giphy database
				if (results.length === 0 )
					{
					$("#rightContent").html("<p id=noResults> No search results found </p>");	
					}
	      
				//Standard path to display gif data
				else 
					{  
					//empty div to ensure previous htmldoes not remain
					$('#rightContent').empty();
					
					for (var i = 0; i < results.length; i++) 
						{
						// Creating a div to hold the gif
						var gifDiv = $("<div>").addClass("gifDiv");
	     		
// RATING ==========================================================================
						// Storing the rating data
						var rating = results[i].rating;
						
						// Creating an element to have the rating displayed
						var pOne = $("<p>").text("Rating: " + rating).attr("class", "rating");
						
						// Displaying the rating
						gifDiv.append(pOne);
		      
// GIF IMAGE =======================================================================      
			      // Retrieving the URL for the image
			      			      
						var imgURL = results[i].images.fixed_height_still.url;
										
						var gifURL = results[i].images.fixed_height.url;
										
						// Creating an element to hold the image
						var image = $('<img>').attr("src", imgURL).attr('data-animate', gifURL).attr('data-still', imgURL).attr('data-state', 'still').addClass("gifImage");
								
						// Appending the image
						gifDiv.append(image);
									
						// Putting the entire gif above the previous gifs
						$("#rightContent").prepend(gifDiv);
			    	 	    	
		    			} //for loop
					}
	    		}); //done
	 	}

// =================================================================================
// PLAY GIF ////////////////////////////////////////////////////////////////////////
// ================================================================================= 
// function to create ability to play and pause gif
function gifPlay()
	{
	var state = $(this).attr('data-state');
	// if currently paused:
	if ( state == 'still')
		{
		// change image to animated image(gif)
    	$(this).attr('src', $(this).data('animate'));
      	//change state to animate
    	$(this).attr('data-state', 'animate');
			
		//change border color to green with a slow transition
   		$(this)
   			.css({border: '3px solid rgba(0, 255, 131, 1)'})
   			.animate({borderWidth: 3}, 
   			50000);
     
      	console.log("PLAYING");
      	}
    // if currently playing:
    else
    	{
      // change image to still image(gif)
      	$(this).attr('src', $(this).data('still'));
       //change state to still
      	$(this).attr('data-state', 'still');
      
      	console.log("PAUSED")
			
		//change border color back to purple with a slow transition
   		$(this)
   			.css({border: '3px solid #C8158D'})
   			.animate({borderWidth: 3}, 
   			50000);
				
      	};

	};

$(document).on('click', '.gifImage', gifPlay);

// =================================================================================
// TRENDING ////////////////////////////////////////////////////////////////////////
// =================================================================================
$(document).on('click', '#trending', function()
	{
	// AJAX call triggered when the trending button is clicked
	var trendingURL = "https://api.giphy.com/v1/gifs/trending?api_key=a4ccf65cb57740069f952abd8f4ec36c&limit=10";
    $.ajax(
    	{
      url: trendingURL,
      method: 'GET'
    	})
    	.done(function(trendingResponse) 
    		{
      	console.log(trendingResponse);
    		
// LOOP THROUGH ARRAY ==============================================================
								
				var results = trendingResponse.data;
				
				//emtpy div to ensure previous gifs remain
		      $('#rightContent').empty();
		      
		      for (var i = 0; i < results.length; i++) 
		      	{
			      // Creating a div to hold the gif
			      var gifDiv = $("<div>").addClass("gifDiv");
	     		
// RATING ==========================================================================
			      // Storing the rating data
			      var rating = results[i].rating;
			      
			      // Creating an element to have the rating displayed
			      var pOne = $("<p>").text("Rating: " + rating).attr("class", "rating");
			      
			      // Displaying the rating
			      gifDiv.append(pOne);
		      
// GIF IMAGE =======================================================================      
			      // Retrieving the URL for the image
			      			      
			      var imgURL = results[i].images.fixed_height_still.url;
			      			      
			      var gifURL = results[i].images.fixed_height.url;
			      			      
			      // Creating an element to hold the image
			      var image = $('<img>').attr("src", imgURL).attr('data-animate', gifURL).attr('data-still', imgURL).attr('data-state', 'still').addClass("gifImage");
		        	      
			      // Appending the image
			      gifDiv.append(image);
			      		      
			      // Putting the entire gif above the previous gifs
			      $("#rightContent").prepend(gifDiv);
			    	 	    	
		    		} //for loop
				
	    	}); //done
		
	});
	
// =================================================================================
// REFRESH /////////////////////////////////////////////////////////////////////////
// =================================================================================
$(document).on('click', '#refresh', function()
	{
	//function to refresh the list of topics
	topics = ["Ron Swanson", "Funny Star Wars", "Trump", "NBA"];
	renderButtons();
	})
});  //document ready