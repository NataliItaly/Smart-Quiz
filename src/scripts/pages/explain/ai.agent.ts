await fetch("/.netlify/functions/explain", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    question: "Яке місто є столицею Франції?",
    answer: "Париж"
  })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));  

export { };


