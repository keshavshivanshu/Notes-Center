import React, { useEffect } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import { useDispatch, useSelector } from 'react-redux';
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { deleteNoteAction, listNotes } from "../../actions/notesActions";
const MyNotes = ({search}) => {
  const dispatch = useDispatch();
  const noteList = useSelector((state) => state.noteList);
  const {loading,notes,error} = noteList;

  const userLogin = useSelector((state) => state.userLogin);
  const {userInfo} = userLogin;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const {success: successUpdate} = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const { loading:loadingDelete,error:errorDelete,success:successDelete} = noteDelete;
  const deleteHandler = (id) => {
    if (window.confirm("are you sure!")) {
      dispatch(deleteNoteAction(id));
    }
  };

 console.log(notes);
  
const history = useNavigate();

 useEffect(() => {
   dispatch(listNotes());
   if(!userInfo){
     history("/");
   }
 },[dispatch,successCreate,history,userInfo,successUpdate,successDelete]);
 
  
  return (
    <MainScreen title={`welcome back ${userInfo.name}..`}>
      <Link to="/createnote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          create new note
        </Button>
      </Link>
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loadingDelete && <Loading />}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      {notes?.reverse().filter(filterNote => (
        filterNote.title.toLowerCase().includes(search.toLowerCase())
      )).map((note) => (
        <Accordion key={note._id}>
          <Card style={{ margin: 10 }}>
            <Card.Header style={{ display: "flex" }}>
              <span
                style={{
                  color: "black",
                  textDecoration: "none",
                  flex: 1,
                  cursor: "pointer",
                  alignSelf: "center",
                  fontSize: 18,
                }}
              >
                <Accordion.Header as={Card.Text} variant='link' eventKey="0">{note.title}</Accordion.Header>
                
              </span>

              <div>
                <Button href={`/note/${note._id}`}>Edit</Button>
                <Button
                  variant="danger"
                  className="mx-2"
                  onClick={() => deleteHandler(note._id)}
                >
                  Delete
                </Button>
              </div>
            </Card.Header>
            <Accordion.Body eventKey="0">
            <Card.Body>
              <h4>
                <Badge variant="success">Category - {note.category}</Badge>
              </h4>
              <blockquote className="blockquote mb-0">
                <p>{note.content}</p>
                <footer className="blockquote-footer">
                        Created on{" "}
                        <cite title="Source Title">
                          {note.createdAt.substring(0, 10)}
                        </cite>
                      </footer>
              </blockquote>
            </Card.Body>
            </Accordion.Body>
          </Card>
        </Accordion>
      ))}
    </MainScreen>
  );
};

export default MyNotes;
