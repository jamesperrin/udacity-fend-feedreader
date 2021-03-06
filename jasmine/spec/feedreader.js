"use strict";

/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).toBeGreaterThan(0);
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('should have an URL defined and URL is not empty', () => {
            // Ensuring we have feeds to test
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).toBeGreaterThan(0);

            // Test criteria
            const testFeeds = allFeeds.filter(el => !el.url || !el.url.trim());

            // Test Expections
            expect(testFeeds.length).toBe(0);
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('should have a Name defined and Name is not empty', () => {
            // Ensuring we have feeds to test
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).toBeGreaterThan(0);

            // Test criteria
            const testFeeds = allFeeds.filter(el => !el.name || !el.name.trim());

            // Test Expections
            expect(testFeeds.length).toBe(0);
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', () => {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('should be hidden by default', () => {
            const body = document.querySelector('body');

            // Ensures our element selection(s) are defined
            expect(body).toBeDefined();

            // Test Expections
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });

        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('should be visible when clicked, then hidden when clicked again', () => {
            const menu = document.querySelector('.menu-icon-link');
            const body = document.querySelector('body');

            // Ensures our element selection(s) are defined
            expect(menu).toBeDefined();
            expect(body).toBeDefined();

            // Click event to display menu
            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);

            // Click event to hide menu
            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });
    });


    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', () => {
        beforeEach((done) => {
            loadFeed(0, () => done());
        });

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('should have at least a single entry', (done) => {
            const entries = document.querySelectorAll('.feed .entry');

            // Test criteria and Expections
            expect(entries).toBeDefined();
            expect(entries.length).toBeGreaterThan(0);

            // Call asynchronous done() function
            done();
        });
    });


    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', () => {
        const feed1 = {};
        const feed2 = {};

        beforeEach((done) => {
            // Retrieve the 1st feed content
            loadFeed(0, () => {
                // Retrieves the last feed content
                let lastFeed = document.querySelector('div.feed > .entry-link:last-child');

                // Populate test feed container
                feed1.url = lastFeed.href;
                feed1.name = lastFeed.children[0].innerText;

                // DEBUG CODE
                // console.log(`feed1.url: ${feed1.url}`);
                // console.log(`feed1.name: ${feed1.name}`);

                // Retrieves the 2nd feed content
                loadFeed(1, () => {
                    // Retrieve the last feed content
                    let lastFeed = document.querySelector('div.feed > .entry-link:last-child');

                    // Populate test feed container
                    feed2.url = lastFeed.href;
                    feed2.name = lastFeed.children[0].innerText;

                    // DEBUG CODE
                    // console.log(`feed2.url: ${feed2.url}`);
                    // console.log(`feed2.name: ${feed2.name}`);

                    // done() needs to be a Callback of second loadFeed()
                    // Or, feed2 will be undefined
                    done();
                });
            });
        });


        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         * @see
         * https: //discussions.udacity.com/t/new-feed-selection-question/797040
         * https: //jasmine.github.io/api/2.6/matchers.html
         */
        it('should actually change content', (done) => {

            // Ensures our test feeds are defined
            expect(feed1.url).toBeDefined();
            expect(feed2.url).toBeDefined();

            // Test criteria and Expections
            expect(feed1.url).not.toBe(feed2.url);
            expect(feed1.name).not.toBe(feed2.name);

            // Call asynchronous done() function
            done();
        });
    });
}());