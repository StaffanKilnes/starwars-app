# Welcome to Starwars!

## How to run the project

1. Clone the repository
2. Run `yarn` to install the dependencies
3. Make sure you have an iOS or Android simulator/emulator on your machine.
4. Run `yarn ios` or `yarn android` to run the project on a simulator/emulator.

## Notes

- There's probably some leftover dependencies from the automatic project setup that are not actually used.
- Because of the way RTK Query works, I opted for having a state variable for the current page and fetching based on that as a query parameter instead of using the "next" and "previous" properties of the API response. However, I use the "next" and "previous" properties to determine if there are more pages to fetch and to display the pagination buttons.
- The search could be improved by adding a debounce to the search input and searching as the user types rather than only searching when the user presses the "Go!" button. Instead, I've added a throttling hook to limit the number of requests to the API to one per second.
- Loading states are a bit messy. For example, the character list could be rendered while the films are still loading and then you'd have a separate loading state for the films, however due to limited time I opted for just having a single loading state for all the data.
- I haven't added any tests or comments - but that should of course be part of any "real" project.
- The "Next" button is still active even when the user has searched for a character. This is a bit confusing as pressing it will do nothing until the search is cleared. Ideally it should be disabled until the search is cleared.
- Error handling is very basic. If there's an error fetching the data, the user is presented with a generic message and aretry button.
- Ideally I would have implemented infinite scroll and pull to refresh in the FlatList!
- I did all of this in a single commit which of course I would never do in a real project. However, this is such a small project that I just decided to go for it.
