import { render, fireEvent, waitFor, act } from "@testing-library/react";
import Search from "./Search";

// Mocking the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        data: {
          results: [
            {
              id: 1011334,
              name: "3-D Man",
              thumbnail: {
                path: "http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784",
                extension: "jpg",
              },
            },
          ],
        },
      }),
  })
);

describe("Search component", () => {
  it("renders and fetches character data correctly", async () => {
    // Render the component
    const { getByText, getByPlaceholderText } = render(<Search />);

    // Simulate typing into the input
    fireEvent.change(getByPlaceholderText("Enter Character Name"), {
      target: { value: "3-D Man" },
    });

    // Simulate submitting the form
    fireEvent.submit(getByText("Shearch Character"));

    // Wait for the asynchronous character data fetching to complete
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    // Check if the character name is rendered
    const characterNameElement = getByText("3-D Man");
    expect(characterNameElement).toBeInTheDocument();

    // Check if the "View Comics" caption is rendered
    const viewComicsCaptionElement = getByText("View Comics");
    expect(viewComicsCaptionElement).toBeInTheDocument();
  });
});
