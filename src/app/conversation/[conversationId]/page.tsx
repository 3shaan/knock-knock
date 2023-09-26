import { getConversationById } from "@/app/Action/getConversationById";
import { getMessage } from "@/app/Action/getMessage";
import EmptyState from "@/app/components/EmptyState";
import Body from "./components/Body";
import Form from "./components/Form";
import Header from "./components/Header";

type Props = {
  conversationId: string;
};

export default async function Conversation({ params }: { params: Props }) {
  const conversation = await getConversationById(params.conversationId);
  const message = await getMessage(params.conversationId);
  //   console.log(conversation);

  if (!conversation) {
    return (
      <div
        className="
        md:pl-[22.5rem] 
        h-full
        "
      >
        <div
          className="
            flex
            flex-col
            h-full
            "
        >
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div
      className="
  h-full
  md:pl-[22.5rem] 
  "
    >
      <div className="h-full flex flex-col">
        <Header conversation={conversation} />
        <Body initialMessage={message} />
        <Form />
      </div>
    </div>
  );
}
