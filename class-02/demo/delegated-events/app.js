// click on the button
$('button').on('click', function() {
  
    // grab the input text we want to capture
    let textfield = $('input');
    let content = textfield.val();
    
    // add an <li> that contains
    // the text from the input field
    $('ul').append(`<li>${content}</li>`);
    
    // reset the input
    textfield.val('');
  });
  
  // DELEGATION TIME!!! //
  
  // since there isn't any knowledge of the
  // item we added to our list when the page loaded
  // we need to tell our <ul> to watch for any <li>'s
  // that get added, thus allowing us to interact with them
  
  // the <ul> is our container to watch
  // the <li> is the item we are clicking on to remove
  
  $('ul').on('click', 'li', function() {
    // remove the <li> that was clicked on
    $(this).remove();
  });
  
  // uncomment the block below and comment out the
  // block above to see how this conventional structure
  // doesn't work, while the delegated version above does
  
  // $('ul li').on('click', function() {
  //   $(this).remove();
  // });