import { render, fireEvent, screen, waitFor, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@/stores/store";
import { ProductForm } from "@/pages/product/components/product-form";

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

class DataTransfer {
  items: DataTransferItemlist = new DataTransferItemlist();
}

class DataTransferItemlist {
  add() {}
}

jest.mock("../assets/images/product-sample.jpg", () => "product-sample.jpg");
describe("Product Form must work properly", () => {
  global.ResizeObserver = ResizeObserver;
  global.URL.createObjectURL = jest.fn();
  global.DataTransfer = DataTransfer as any;
  global.DataTransferItemList = DataTransferItemlist as any;

  it("should render and test all input form except image input", () => {
    const { getByRole, getByLabelText } = render(
      <Provider store={store}>
        <ProductForm dataId="" isEditable={false} />
      </Provider>
    );

    //product name
    fireEvent.input(getByRole("textbox", { name: "Product Name" }), {
      target: { value: "Product Name 1" },
    });
    expect(getByLabelText(/Product Name/)).toHaveValue("Product Name 1");

    //category
    fireEvent.input(getByRole("combobox", { name: "Category" }), {
      target: { value: "fashions" },
    });
    expect(getByLabelText(/Category/)).toHaveValue("fashions");

    //description
    fireEvent.input(getByRole("textbox", { name: "Description" }), {
      target: { value: "Description Product 1" },
    });
    expect(getByLabelText(/Description/)).toHaveValue("Description Product 1");

    //price
    fireEvent.input(getByRole("spinbutton", { name: "Price" }), {
      target: { value: "200" },
    });
    expect(getByLabelText(/Price/)).toHaveValue(200);

    //product freshness
    const radio_1 = getByLabelText("New");
    expect(getByLabelText("New")).not.toBeChecked();
    fireEvent.click(radio_1);
    expect(getByLabelText("New")).toBeChecked();
    const radio_2 = getByLabelText("Second");
    expect(getByLabelText("Second")).not.toBeChecked();
    fireEvent.click(radio_2);
    expect(getByLabelText("Second")).toBeChecked();
    const radio_3 = getByLabelText("Refurbished");
    expect(getByLabelText("Refurbished")).not.toBeChecked();
    fireEvent.click(radio_3);
    expect(getByLabelText("Refurbished")).toBeChecked();
  });

  let file: File;
  beforeEach(() => {
    file = new File(["tes"], "chucknorris.png", { type: "image/png" });
  });
  //image of product
  it("should test image input", async () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <ProductForm dataId="" isEditable={false} />
      </Provider>
    );

    let uploader = getByLabelText("Image of Product");
    await waitFor(() =>
      fireEvent.change(uploader, {
        target: { files: [file] },
      })
    );
    let image = document.getElementById("product-image") as HTMLInputElement | null;
    expect(image?.files?.[0]?.name).toBe("chucknorris.png");
    expect(image?.files?.length).toBe(1);
  });

  it("should submit the form and return error empty name", async () => {
    const { getByRole } = render(
      <Provider store={store}>
        <ProductForm dataId="" isEditable={false} />
      </Provider>
    );

    fireEvent.input(getByRole("textbox", { name: "Product Name" }), {
      target: { value: "" },
    });

    fireEvent.click(screen.getByText("Submit"));
    await act(() => new Promise((r) => setTimeout(r, 2000)));
    expect(
      screen.getAllByText("Product Name should have at least 3 character")[0]
    ).toBeInTheDocument();
  });

  it("should submit the form and return error max length name (25)", async () => {
    const { getByRole } = render(
      <Provider store={store}>
        <ProductForm dataId="" isEditable={false} />
      </Provider>
    );

    fireEvent.input(getByRole("textbox", { name: "Product Name" }), {
      target: { value: "naufal nasrullah naufal nasrullah naufal nasrullah naufal nasrullah" },
    });

    fireEvent.click(screen.getByText("Submit"));
    await act(() => new Promise((r) => setTimeout(r, 2000)));
    expect(
      await screen.findByText("String must contain at most 25 character(s)")
    ).toBeInTheDocument();
  });

  it("should submit the form and return error empty fields", async () => {
    const { getByRole } = render(
      <Provider store={store}>
        <ProductForm dataId="" isEditable={false} />
      </Provider>
    );

    fireEvent.input(getByRole("textbox", { name: "Product Name" }), {
      target: { value: "Product Name 1" },
    });

    fireEvent.input(getByRole("combobox", { name: "Category" }), {
      target: { value: "fashions" },
    });

    fireEvent.input(getByRole("textbox", { name: "Description" }), {
      target: { value: "Description Product 1" },
    });

    fireEvent.input(getByRole("spinbutton", { name: "Price" }), {
      target: { value: "200" },
    });

    fireEvent.click(screen.getByText("Submit"));
    await act(() => new Promise((r) => setTimeout(r, 2000)));
    expect(await screen.findByText("Failed")).toBeInTheDocument();
    expect(screen.getAllByText("Your product has not been added")[0]).toBeInTheDocument();
  });
});
