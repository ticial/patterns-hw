import type {
  DraggableProvided,
  DraggableStateSnapshot,
} from "@hello-pangea/dnd";
import { Draggable } from "@hello-pangea/dnd";

import { type Card } from "../../common/types/types";
import { CardsList } from "../card-list/card-list";
import { DeleteButton } from "../primitives/delete-button";
import { Splitter } from "../primitives/styled/splitter";
import { Title } from "../primitives/title";
import { Footer } from "./components/footer";
import { Container } from "./styled/container";
import { Header } from "./styled/header";
import { socket } from "../../context/socket";
import { CardEvent, ListEvent } from "../../common/enums/enums";

type Props = {
  listId: string;
  listName: string;
  cards: Card[];
  index: number;
};

export const Column = ({ listId, listName, cards, index }: Props) => {
  const onTitleChange = (newTitle: string) => {
    if (newTitle === listName) return;
    socket.emit(ListEvent.RENAME, listId, newTitle);
  };

  const onCreateCard = (cardName: string) => {
    if (cardName === "") return;
    socket.emit(CardEvent.CREATE, listId, cardName);
  };

  const onDelete = () => {
    socket.emit(ListEvent.DELETE, listId);
  };

  return (
    <Draggable draggableId={listId} index={index}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <Container
          className="column-container"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <Header
            className="column-header"
            isDragging={snapshot.isDragging}
            {...provided.dragHandleProps}
          >
            <Title
              aria-label={listName}
              title={listName}
              onChange={onTitleChange}
              fontSize="large"
              width={200}
              isBold
            />
            <Splitter />
            <DeleteButton color="#FFF0" onClick={onDelete} />
          </Header>
          <CardsList listId={listId} listType="CARD" cards={cards} />
          <Footer onCreateCard={onCreateCard} />
        </Container>
      )}
    </Draggable>
  );
};
