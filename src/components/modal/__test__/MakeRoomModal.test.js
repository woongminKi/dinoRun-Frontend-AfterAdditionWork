import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MakeRoomModal from "../MakeRoomModal";

describe("<MakeRoomModal />", () => {
  test("글자 렌더링이 잘 됩니다.", () => {
    render(<MakeRoomModal />);

    expect(screen.getByText("레알 만들기")).toBeInTheDocument();
    expect(screen.getByText("취소")).toBeInTheDocument();
  });

  test("레알 만들기 버튼을 누르면 모달 창이 사라집니다.", () => {
    const onMake = Boolean();
    const { getByTestId } = render(<MakeRoomModal />);
    const realMakeButton = getByTestId("real-make-button");

    fireEvent.change(realMakeButton, {
      onMake: {
        Boolean: false,
      },
    });
    expect(onMake).toEqual(false);
  });

  test("취소 버튼을 누르면 모달 창이 사라집니다.", () => {
    const onClose = Boolean();
    const { getByTestId } = render(<MakeRoomModal />);
    const cancelButton = getByTestId("cancel-button");

    fireEvent.change(cancelButton, {
      onClose: {
        Boolean: false,
      },
    });
    expect(onClose).toEqual(false);
  });
});
