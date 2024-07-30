import type { DraggableProvided } from "@hello-pangea/dnd";

import { type Card } from "../../common/types/types";
import { CopyButton } from "../primitives/copy-button";
import { DeleteButton } from "../primitives/delete-button";
import { Splitter } from "../primitives/styled/splitter";
import { Text } from "../primitives/text";
import { Title } from "../primitives/title";
import { Container } from "./styled/container";
import { Content } from "./styled/content";
import { Footer } from "./styled/footer";
import { CardEvent } from "../../common/enums/enums";
import { socket } from "../../context/socket";

type Props = {
  card: Card;
  isDragging: boolean;
  provided: DraggableProvided;
};

export const CardItem = ({ card, isDragging, provided }: Props) => {
  const onTitleChange = (newTitle: string) => {
    if (newTitle === card.name || newTitle === "") return;
    socket.emit(CardEvent.RENAME, card.id, newTitle);
  };

  const onDescriptionChange = (newDescription: string) => {
    if (newDescription === card.description || newDescription === "") return;
    socket.emit(CardEvent.CHANGE_DESCRIPTION, card.id, newDescription);
  };

  const onDelete = () => {
    socket.emit(CardEvent.DELETE, card.id);
  };

  const onCopy = () => {
    socket.emit(CardEvent.COPY, card.id);
  };
  return (
    <Container
      className="card-container"
      isDragging={isDragging}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      data-is-dragging={isDragging}
      data-testid={card.id}
      aria-label={card.name}
    >
      <Content>
        <Title
          onChange={onTitleChange}
          title={card.name}
          fontSize="large"
          isBold
        />
        <Text text={card.description} onChange={onDescriptionChange} />
        <Footer>
          <DeleteButton onClick={onDelete} />
          <Splitter />
          <CopyButton onClick={onCopy} />
        </Footer>
      </Content>
    </Container>
  );
};
