const panelData = {
    1: {
        title: "Greenhouse",
        image: "GREENHOUSE.jpg",
        text: "In season, the Farm's greenhouse is home to thousands of plant sprouts! Typically, in the cold months of winter and early spring, our greenhouse is full of life and buzzing as our volunteers are planting, watering, and tending to our plant starts! With time and tending, many of these plants are harvested to feed thousands of guests at our pantry."
    },
    2: {
        title: "Main Garden",
        image: "MAIN GARDEN.jpg",
        text: "The Main Garden is where most of the intensive vegetable growing happens at Martha's Community Farm. Featuring 60 raised boxes and several inground fields, we are able to harvest a lot from a small area! The Main Garden is the best place to see our regenerative farming in action! From building healthy soil to integrated pest management, there is always something exciting happening in the Main Garden!"
    },
    3: {
        title: "Perennial Garden",
        image: "PERENNIAL GARDEN.jpg",
        text: "Martha's Perennial Garden features a wide variety of both native and edible plants that come back year after year! Our asparagus bed has almost 300 asparagus plants.  You can also check out the thornless blackberry patch, perennial pollinator garden, and a perennial herb garden!  These pereenials will show you how to increase your production while decreasing your garden labor year after year."
    },
    4: {
        title: "The Shop",
        image: "THE SHOP.jpg",
        text: "The shop, located in our red barn, is headquarters for the Facilities Team of volunteers. The Shop features a woodshop, repair shop and extensive library of tools.  If you've ever wanted to get more acquainted with tools and DIY projects, this is the place to do it!  The Shop is the place where building, fixing, and improving the Farm happens!"
    },
    5: {
        title: "Apiary",
        image: "APIARY.jpg",
        text: "Meet our bee-autiful bees! Martha's Community Farm is the beautiful place about 100,000 Honey Bees call home! Our hives help pollinate our crops during the growing season and also provide honey for our food pantry! Each year we are able to provide hundreds of families with fresh local honey harvested straight from the Farm!"
    },
    6: {
        title: "Mushroom Garden",
        image: "MUSHROOM GARDEN.jpg",
        text: "Martha’s Mushroom Garden is our center for all things mycology at the farm! One of the newer additions to the farm, our Mushroom Garden showcases a variety of outdoor growing techniques. We focus on three varieties of mushrooms for our pantry: oyster, wine cap, and shiitake!"
    },
    7: {
        title: "Pollinator Garden",
        image: "POLLINATOR GARDEN.jpg",
        text: "The Community Farm has integrated several pollinator gardens over its 10 acres. These pollinator gardens feature native perennial flowers that provide an excellent source of food for local native pollinators. One can often spot monarch butterflies, bees, and a panacea of other insects visiting the beautiful flowers these gardens!"
    },
    8: {
        title: "Food Forest",
        image: "FOOD FOREST.jpg",
        text: "Martha's Community Farm features a Food Forest which is also a riparian buffer! This acre planting consists of all native trees, shrubs and flowering plants which reduce erosion and runoff to promote watershed health for our neighboring Perkiomen Creek by reducing erosion and runoff.  They also provide habitat and food for native wildlife.  Finally, these natives produce fruits and nuts such as pawpaw, persimmon, hazelnut and plum for our food pantry!"
    }
};
let activeMarker = null; // Store the currently active marker
 
let currentPanel = null; // Track which panel is currently active

let activeTooltip = null; // Track active tooltip
 
function openPanel(markerId) {
    const data = panelData[markerId];
 
    document.getElementById("panel-title").textContent = data.title;
    document.getElementById("panel-img").src = data.image;
    document.getElementById("panel-img").alt = data.title;
    document.getElementById("panel-text").textContent = data.text;
 
    document.getElementById("side-panel").style.left = "0";
    document.querySelector(".map-container").classList.add("shifted"); // Shift background
    document.querySelector(".title-container").classList.add("shifted");
   
    if (activeMarker) {
        activeMarker.style.backgroundColor = "olive"; // Restore original color
    }
 
    // Set clicked marker to black
    activeMarker = document.querySelector(`.marker:nth-child(${markerId})`);
    if (activeMarker) {
        activeMarker.style.backgroundColor = "black";
    }
 
    // Update the current active panel
    currentPanel = markerId;

   // Close tooltip if any
    removeTooltip();
}
 
function closePanel() {
    document.getElementById("side-panel").style.left = "-400px";
    document.querySelector(".map-container").classList.remove("shifted"); // Reset background
    document.querySelector(".title-container").classList.remove("shifted");
    if (activeMarker) {
        activeMarker.style.backgroundColor = "olive";
        activeMarker = null; // Reset active marker reference
    }
    // Close tooltip if any
    removeTooltip();
}
function iconAction(iconId) {
    if (currentPanel == null) {
        alert("Please click on a marker first!");
        return;
    }

    // If tooltip is already open for the same icon, close it
    if (activeTooltip && activeTooltip.dataset.iconId == iconId) {
        removeTooltip();
        return;
    }

    // Otherwise, remove any existing tooltip and show new one
    removeTooltip();

    // Create tooltip container
    const tooltip = document.createElement("div");
    tooltip.classList.add("icon-tooltip");
    tooltip.dataset.iconId = iconId; // Keep track of which icon


    // Define content for each icon based on the active panel
    const iconData = {
        1: { // Greenhouse
            1: `Want to learn more about gardening, growing your own food, and seed starting?
                As part of our volunteer experience, you can get hands-on experience in our Greenhouse!
                <br><a href=https://www.marthascommunityfarm.org/volunteering-at-the-farm target="_blank" style="color: olive; text-decoration: underline;">Learn more about Volunteering here!</a>`,
            2: `Martha's Community Farm Hosts a variety of  free workshops centered around gardening ,growing your own food, and seed starting in our greenhouse!
                <br><a href=https://www.marthascommunityfarm.org/workshops target="_blank" style="color: olive; text-decoration: underline;">Check out our current workshops here and register to learn more!</a>`,
            3: "Did you know? We start most of our plants in our greenhouse using the soil blocking method, a unique process that is both better for seedling health and vigor while also using less plastic!  No transplant shock!"
        },
        2: { // Main Garden
            1: `Want to learn more about gardening and growing your own food? 
            As part of our volunteer experience, you can get hands on experience in our Main Garden!
            <br><a href="https://www.marthascommunityfarm.org/volunteering-at-the-farm" target="_blank" style="color: olive; text-decoration: underline;">Learn more about Volunteering here!</a>`,
            2: `Martha's Community Farm Hosts a variety of  free workshops centered around gardening and growing your own food!
                <br><a href=https://www.marthascommunityfarm.org/workshops target="_blank" style="color: olive; text-decoration: underline;">Check out our current workshops here!</a>`,
            3: "Did you know? The top 3 most popular plants to grow for home gardeners are tomatoes, cucumbers, and sweet peppers! We've grown all those and much more at the Farm!"
        },
        3: { // Perennial Garden
            1: `Want to learn more about growing perennial crops? As part of our volunteer experience, you can get hands on experience in our Perennial Garden!
                <br><a href=https://www.marthascommunityfarm.org/volunteering-at-the-farm target="_blank" style="color: olive; text-decoration: underline;">Learn more about Volunteering here!</a>`,
            2: `Martha's Community Farm Hosts a variety of  free workshops centered around gardening, growing your own food, and perennial plant related topics! 
                <br><a href=https://www.marthascommunityfarm.org/workshops target="_blank" style="color: olive; text-decoration: underline;">Check out our current workshops here and register to learn more!</a>`,
            3: "Did you know? Asparagus, one of the perennial crops we grow at the Farm, will reliably come back year after year for upwards of 15 years! That means we'll be able to send fresh asparagus to our pantry for years to come!"
        },
        4: { // The Shop
            1: `Want to learn more about working on facilities projects and experience with tools, equipment and technique? As part of our volunteer experience, you can get hands on experience in our workshop barn.
                <br><a href=https://www.marthascommunityfarm.org/volunteering-at-the-farm target="_blank" style="color: olive; text-decoration: underline;">Learn more about Volunteering here!</a>`,
            2: `Martha's Community Farm Hosts a variety of  free workshops centered around gardening, growing your own food, and facilities related topics!
                <br><a href=https://www.marthascommunityfarm.org/workshops target="_blank" style="color: olive; text-decoration: underline;">Check out our current workshops here and register to learn more!</a>`,
            3: "Did you know? Every Friday is Facility Friday for our volunteers?  Every week we tackle a hands-on project and learn something together!"
        },
        5: { // Apiary
            1: `Want to learn more about bees and beekeeping? Volunteering is the best way to get acquainted with the benefits of bees and get hands on experience in all other areas of the Farm!
                <br><a href=https://www.marthascommunityfarm.org/volunteering-at-the-farm target="_blank" style="color: olive; text-decoration: underline;">Learn more about Volunteering here!</a>`,
            2: `Martha's Community Farm Hosts a variety of  free workshops centered around gardening , growing your own food, and beekeeping!
                <br><a href=https://www.marthascommunityfarm.org/workshops target="_blank" style="color: olive; text-decoration: underline;">Check out our current workshops here and register to learn more!</a>`,
            3: "Did you know? There are over 400 species of bees in Pennsylvania responsible for pollinating everything from peach trees to squash plants. Honey Bees are just one of those species!"
        },
        6: { // Mushroom Garden
            1: `Want to learn more about growing mushrooms? As part of our volunteer experience, you can get hands on experience in our mushroom garden!
                <br><a href=https://www.marthascommunityfarm.org/volunteering-at-the-farm target="_blank" style="color: olive; text-decoration: underline;">Learn more about Volunteering here!</a>`,
            2: `Martha's Community Farm hosts a variety of  free workshops centered around gardening, growing your own food, and mushrooms!
                <br><a href=https://www.marthascommunityfarm.org/workshops target="_blank" style="color: olive; text-decoration: underline;">Check out our current workshops here and register to learn more!</a>`,
            3: "Did you know? Mushrooms are fast growers! Typically, you can expect a mushroom to double in size every 24 hours! That translates to lots of mushrooms for our pantry!"
        },
        7: { // Pollinator Garden
            1: `Want to learn more about native flowers and pollinators? Volunteering is the best way to get hands on experience in our pollinator garden and all other areas of the Farm!
                <br><a href=https://www.marthascommunityfarm.org/volunteering-at-the-farm target="_blank" style="color: olive; text-decoration: underline;">Learn more about Volunteering here!</a>`,
            2: `Martha's Community Farm Hosts a variety of  free workshops centered around gardening and growing your own food, and native flowers!
                <br><a href=https://www.marthascommunityfarm.org/workshops target="_blank" style="color: olive; text-decoration: underline;">Check out our current workshops here and register to learn more!</a>`,
            3: "Did you know? The flowers featured in our Food Forest Pollinator Garden are all resistant to deer! We get a lot of deer activity on the farm, so anything that gets planted outside fencing needs to be deer resistant!"
        },
        8: { // Food Forest
            1: `Want to learn more about food forests and native fruit trees? Volunteering is the best way to get hands on experience in our food forest and all other areas of the Farm!
                <br><a href=https://www.marthascommunityfarm.org/volunteering-at-the-farm target="_blank" style="color: olive; text-decoration: underline;">Learn more about Volunteering here!</a>`,
            2: `Martha's Community Farm Hosts a variety of  free workshops centered around gardening, growing your own food, and food forest related topics!
                <br><a href=https://www.marthascommunityfarm.org/workshops target="_blank" style="color: olive; text-decoration: underline;">Check out our current workshops here and register to learn more!</a>`,
            3: "Did you know? Pawpaw, one of the fruit trees featured in our Food Forest, is the largest fruit native to North America! Due to its short shelf life, it is not commonly available in grocery stores!"
        }
    };
 
   // Define content for each icon based on the active panel
    const currentIconData = iconData[currentPanel] || iconData[1];

    tooltip.innerHTML = currentIconData[iconId] || "More information coming soon!";

    // Correct way to find the clicked icon:
    const iconElements = document.querySelectorAll(".icon-container a");
    const iconElement = iconElements[iconId - 1]; // Fix: nth-child didn't work because of the structure
    if (!iconElement) return;

    document.body.appendChild(tooltip);

    // Position tooltip near the clicked icon
    const rect = iconElement.getBoundingClientRect();
    tooltip.style.top = `${rect.top + window.scrollY - 10}px`;
    tooltip.style.left = `${rect.right + 10}px`;

    // Style the tooltip
    tooltip.style.position = "absolute";
    tooltip.style.background = "black";
    tooltip.style.color = "white";
    tooltip.style.padding = "10px";
    tooltip.style.borderRadius = "10px";
    tooltip.style.boxShadow = "2px 2px 5px rgba(0, 0, 0, 0.3)";
    tooltip.style.maxWidth = "220px";
    tooltip.style.zIndex = "1000";

    // Optional: Add triangle (speech bubble effect)
    const triangle = document.createElement("div");
    triangle.style.position = "absolute";
    triangle.style.left = "-10px";
    triangle.style.top = "10px";
    triangle.style.width = "0";
    triangle.style.height = "0";
    triangle.style.borderTop = "10px solid transparent";
    triangle.style.borderBottom = "10px solid transparent";
    triangle.style.borderRight = "10px solid black";

    tooltip.appendChild(triangle);
    activeTooltip = tooltip;

   
}
function removeTooltip() {
    if (activeTooltip) {
        activeTooltip.remove();
        activeTooltip = null;
    }
}