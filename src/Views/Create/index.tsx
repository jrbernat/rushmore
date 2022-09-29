import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { app, CommonProps } from "../../App";
import ExitButton from "../../Components/ExitButton";
import TextInput, { LargeTextInput } from "../../Components/TextInput";
import "./index.css";

const Create = (props: CommonProps) => {
  const { setView } = props;

  const [topic, setTopic] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);

  const [topicCache, setTopicCache] = useState("");
  const [descriptionCache, setDescriptionCache] = useState("");

  const needsTopic = topic === undefined;
  const needsDescription = description === undefined;

  useEffect(() => {
    if (topic) {
      setTopicCache(topic);
    }
    if (description) {
      setDescriptionCache(description);
    }
  }, [topic, description]);

  const nav = useNavigate();

  const onCreate = () => {
    app.currentUser?.functions.createRushmore({
      title: topic,
      description: description,
    }).then(({insertedId}) => {
      nav(`rushmore/${insertedId.toString()}`, {replace: true});
    });
  };

  const renderTopic = () => {
    if (needsTopic)
      return (
        <TextInput
          onSubmit={(text: string) => {
            if (text) {
              setTopic(text);
            }
          }}
          description={"Choose a Topic"}
          defaultText={topicCache}
        />
      );
    return (
      <div className="confirmed-text">
        Topic:
        <span className="subtitle">{topic}</span>
        <span className="change-button">
          <button onClick={() => setTopic(undefined)}>Edit</button>
        </span>
      </div>
    );
  };

  const renderDescription = () => {
    if (needsDescription)
      return (
        <LargeTextInput
          onSubmit={(text: string) => {
            if (text) {
              setDescription(text);
            }
          }}
          description={"Enter description"}
          defaultText={descriptionCache}
        />
      );
    return (
      <div className="confirmed-text">
        Description:
        <span className="subtitle">{description}</span>
        <span className="change-button">
          <button onClick={() => setDescription(undefined)}>Edit</button>
        </span>
      </div>
    );
  };

  return (
    <div className="create">
      <ExitButton onExit={() => setView("landing")} />
      <div className="subtitle">Create a new Rushmore</div>
      <div className="create-container">
        {renderTopic()}
        {renderDescription()}
        {!needsDescription && !needsTopic && (
          <span>
            <button onClick={onCreate}>Create Rushmore</button>
          </span>
        )}
      </div>
    </div>
  );
};

export default Create;
