document.getElementById('reviewForm').addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('Form submitted');

    const name = document.getElementById('reviewName').value;
    const rating = document.getElementById('reviewRating').value;
    const comment = document.getElementById('reviewComment').value;

    console.log('Form data:', { name, rating, comment });


});