document.addEventListener('DOMContentLoaded', function() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    // Variables to track mouse position for drag detection
    let startX;
    let startY;
    const threshold = 10; // The number of pixels a drag must be to be considered a drag

    skillItems.forEach(item => {
        // Record the mouse position when the user presses down
        item.addEventListener('mousedown', function(e) {
            startX = e.clientX;
            startY = e.clientY;
        });

        // Toggle visibility only if the mouse position hasn't changed much
        item.addEventListener('mouseup', function(e) {
            const endX = e.clientX;
            const endY = e.clientY;

            // Calculate the distance the mouse moved
            const distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));

            // If the movement is less than the threshold, it's a click, so toggle the details
            if (distance < threshold) {
                const targetId = this.getAttribute('data-target');
                const targetDetails = document.getElementById(targetId);

                // Hide all other skill details
                document.querySelectorAll('.skill-details').forEach(details => {
                    if (details !== targetDetails) {
                        details.classList.remove('visible');
                    }
                });

                // Toggle the 'visible' class on the clicked skill's details
                targetDetails.classList.toggle('visible');
            }
        });
    });
});

document.querySelectorAll('.view-cert').forEach(button => {
  button.addEventListener('click', () => {
    const certUrl = button.dataset.cert;
    if(certUrl) {
      window.open(certUrl, '_blank'); // open in new tab
    } else {
      alert('Certificate file not found!');
    }
  });
});

const canvas = document.getElementById("network");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Static network nodes (slightly more for density)
let nodes = [];
const staticNodesCount = 50; // increased from 30
for (let i = 0; i < staticNodesCount; i++) {
  nodes.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    alpha: 1 // full opacity
  });
}

// Mouse nodes (fade over time)
let mouseNodes = [];
const maxMouseNodes = 15; // limit for performance
document.addEventListener("mousemove", e => {
  if(mouseNodes.length < maxMouseNodes){
    mouseNodes.push({ x: e.clientX, y: e.clientY, vx: 0, vy: 0, alpha: 1 });
  }
});

function draw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);

  // Combine static and mouse nodes
  const allNodes = [...nodes, ...mouseNodes];

  // Draw nodes
  for (let node of allNodes) {
    node.x += node.vx;
    node.y += node.vy;

    // Bounce inside canvas
    if(node.x < 0 || node.x > canvas.width) node.vx *= -1;
    if(node.y < 0 || node.y > canvas.height) node.vy *= -1;

    ctx.beginPath();
    ctx.arc(node.x, node.y, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0,255,100,${node.alpha})`;
    ctx.shadowBlur = 8;
    ctx.shadowColor = "#0f0";
    ctx.fill();
  }

  // Draw connections only for nearby nodes
  for (let i = 0; i < allNodes.length; i++) {
    for (let j = i + 1; j < allNodes.length; j++) {
      let dx = allNodes[i].x - allNodes[j].x;
      let dy = allNodes[i].y - allNodes[j].y;
      let dist = Math.sqrt(dx*dx + dy*dy);
      if(dist < 100){
        ctx.beginPath();
        ctx.moveTo(allNodes[i].x, allNodes[i].y);
        ctx.lineTo(allNodes[j].x, allNodes[j].y);
        ctx.strokeStyle = `rgba(0,255,100,0.12)`; // slightly lighter lines
        ctx.stroke();
      }
    }
  }

  // Fade out mouse nodes gradually
  mouseNodes = mouseNodes.map(node => ({ ...node, alpha: node.alpha - 0.02 }))
                         .filter(node => node.alpha > 0); // remove invisible nodes

  requestAnimationFrame(draw);
}

draw();

// Resize canvas on window resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});


const typewriter = document.querySelector(".typewriter");
const text = typewriter.textContent;
typewriter.textContent = "";

const cursor = document.createElement("span");
cursor.classList.add("cursor");
cursor.textContent = "|";
typewriter.appendChild(cursor);

let i = 0;
const speed = 10; // typing speed in ms

function type() {
  if(i < text.length) {
    cursor.insertAdjacentText("beforebegin", text.charAt(i));
    i++;
    setTimeout(type, speed);
  }
}

type();


document.querySelector(".contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // stop form refresh

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const country = document.getElementById("country").value;
    const message = document.getElementById("message").value;

    console.log("Form submitted:");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Country:", country);
    console.log("Message:", message);

    alert("Thank you, " + name + "! Your message has been received.");
});



