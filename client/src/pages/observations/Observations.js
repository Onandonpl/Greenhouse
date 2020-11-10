import React from "react";
import styled from "styled-components/macro";
import Post from "./Post";
import AddPost from "./AddPost";
import { useObservations } from "../../hooks/useObservations";
import { Helmet } from "react-helmet";

const Observations = () => {
  const [observationsList] = useObservations();
  const renderObservations =
    observationsList !== null
      ? observationsList.map((observation) => {
          return (
            <Post
              key={observation.id}
              title={observation.data.title}
              content={observation.data.content}
              id={observation.id}
            ></Post>
          );
        })
      : null;

  return (
    <ObservationsContainer>
      <Helmet>
        <title>Obserwacje</title>
      </Helmet>
      <AddPost />
      {renderObservations}
    </ObservationsContainer>
  );
};

export default Observations;
const ObservationsContainer = styled.div`
  position: relative;
  width: 100vw;
  min-height: 100vh;
  padding: 2.7rem 10px;
  display: flex;
  flex-direction: column;
`;
