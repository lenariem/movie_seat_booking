//uncheck chairs and check price and amount

//btn clear your choice and check amount and price

//npm i @testing-library/jest-dom
//npm i @testing-library/dom

const { fireEvent, getByText } = require("@testing-library/dom");
const { userEvent } = require("@testing-library/user-event");
const {} = require("@testing-library/jest-dom/extend-expect");
const { JSDOM } = require("jsdom");
const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");

let dom;
let container;

function beforeRunTests() {
    // Constructing a new JSDOM with this option is the key
    // to getting the code in the script tag to execute.
    dom = new JSDOM(html, { runScripts: "dangerously" });
    container = dom.window.document.body;
}

describe("Rendering elements:", () => {
    beforeEach(() => {
        beforeRunTests();
    });

    test("should render a color button element", () => {
        expect(container.querySelector("#mode")).toBeInTheDocument();
    });

    test("should render a movie-container element", () => {
        const movieContainer = container.querySelector("select");
        expect(movieContainer).not.toBeNull();
        expect(movieContainer).toBeInTheDocument();
    });

    test("should render a cinema element", () => {
        expect(container.querySelector("#cinema")).toBeInTheDocument();
    });

    test("should render a price and select", () => {
        expect(container.querySelector(".text")).toBeInTheDocument();
    });

    test("should render a clear button element", () => {
        const clearBtn = container.querySelector("#clearBtn");
        expect(getByText(clearBtn, "Clear your choice")).toBeInTheDocument();
    });
});

describe("Interactivity check:", () => {
    beforeEach(() => {
        beforeRunTests();
    });

    test.only("should clear price and select on clear button click", () => {
        const clearBtn = container.querySelector(".clearLS");
        const countEl = container.querySelector("#count");
        const totalEl = container.querySelector("#total");
        const seats = container.querySelector(".container");
        const seat2El = seats.querySelector("#seat2");

        
        //fireEvent.click(seat2El);

        //console.log(seat1El);
        //console.log(seat1El.getAttribute("class"));
        fireEvent.click(seats);
        console.log(seat2El.getAttribute("class"));
        //expect(countEl).toHaveTextContent("1");
        //expect(countEl).toHaveTextContent("1");
        //expect(seat2El).toHaveTextContent("2");
        /* await expect(countEl).toHaveTextContent("2");
        await expect(totalEl).toHaveTextContent("24"); 

        fireEvent.click(clearBtn);
     
        await expect(totalEl).toHaveTextContent("0");
        await expect(countEl).toHaveTextContent("0"); */
    });

    /*  test('should change movie when select is clicked', () => {
        const movie = container.querySelector("#movie");
        fireEvent.click(movie);

       console.log(movie)
       expect(movie).toMatch(/avengers/i)
    }); */

    /*  test("change color mode when color button is clicked ", async () => {
        const colorBtn = container.querySelector("#mode");
        const clearBtn = container.querySelector("#clearBtn");
        fireEvent.click(colorBtn);
       
        console.log(clearBtn )
        /* const clearBtn = container.querySelector("#clearBtn")
        console.log(clearBtn.getAttribute('class'))
        console.log("color" + dom.window.getComputedStyle(clearBtn).color) */
    /*  const classBody = await container.classList;
        console.log(classBody); */

    /* classList.contains("seat") */
    //expect(container).toHaveClass("light", "mode");
    //});
    // test if body has class light mode

    //click on select change movie

    //click on chairs and check price and amount

    //change movie and check price

    /* 
    it("renders a new paragraph via JavaScript when the button is clicked", async () => {
        const button = getByText(container, "Click me for a terrible pun");

        fireEvent.click(button);
        let generatedParagraphs =
            container.querySelectorAll("#pun-container p");
        expect(generatedParagraphs.length).toBe(1);

        fireEvent.click(button);
        generatedParagraphs = container.querySelectorAll("#pun-container p");
        expect(generatedParagraphs.length).toBe(2);

        fireEvent.click(button);
        generatedParagraphs = container.querySelectorAll("#pun-container p");
        expect(generatedParagraphs.length).toBe(3);
    }); */
});
