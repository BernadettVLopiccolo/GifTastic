$(document).ready(function() {
            // Initial array of animals
            var animals = ["llama", "donkey", "pig", "sloth", "wolf", "dingo"];
            
            $(document).on("click", ".gif", function() {
                if ($(this).attr("data-playing") === "false") {
                    $(this).attr('src', $(this).attr("data-animated"));
                    $(this).attr("data-playing", "true");
                } else {
                    $(this).attr('src', $(this).attr("data-still"));
                    $(this).attr("data-playing", "false");
                    console.log("stop", this);

                }

                var animated = $(this).attr("data-animated");
                $(this).attr('src', animated);
                console.log("moves", animated);

            
            });

            // displayAnimalInfo function re-renders the HTML to display the appropriate content
            function displayAnimalInfo() {

                var animal = $(this).attr("data-name");
                console.log(this);

                var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";
                console.log(queryURL);

                // Creating an AJAX call for the specific animal button being clicked
                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).done(function(response) {
                    $("#animals").empty(animalButtons);
                    for (var b = 0; b < response.data.length; b++) {
                        var imgUrl = response.data[b].images.downsized_still.url;
                        var animatedUrl = response.data[b].images.downsized.url;
                        console.log(imgUrl);
                        var animalDiv = $("<img>")
                            .attr("src", imgUrl)
                            .addClass("gif")
                            .attr("data-animated", animatedUrl)
                            .attr("data-still", imgUrl)
                            .attr("data-playing", "false");

                        $("#animals").append(animalDiv);
                    }

                });
            }
            
            // Function for displaying animal data
            function renderButtons() {

                // Deleting the animals prior to adding new animals
                // (this is necessary otherwise you will have repeat buttons)
                $("#animalButtons").empty();
        
                // Looping through the array of movies
                for (var i = 0; i < animals.length; i++) {

                    // Then dynamicaly generating buttons for each animal in the array
                    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
                    console.log(animals); //can remove
                    var a = $("<button>");
                    
                    // Adding a class of animal to our button
                    a.addClass("btn");

                    // Adding a data-attribute
                    a.attr("data-name", animals[i]);

                    // Providing the initial button text
                    a.text(animals[i]);

                    // Adding the button to the buttons-view div
                    $("#animalButtons").append(a);
                }

            }

            // This function handles events where an animal button is clicked
            $("#addAnimal").on("click", function(event) {
                event.preventDefault();

                // This line grabs the input from the textbox
                var animal = $("#animal-input").val().trim();
                if (animal !== "") {
                    // Adding animal from the textbox to our array
                    animals.push(animal);

                    // Calling renderButtons which handles the processing of our animal array
                    renderButtons();
                }
                
            });

            // Adding a click event listener to all elements with a class of "animal" 
            $(document).on("click", ".btn" , displayAnimalInfo);

            // Calling the renderButtons function to display the intial buttons
            renderButtons();

        });