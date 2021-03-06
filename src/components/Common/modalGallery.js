import React, { useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import AddItemButton from "../Shared/addItemButton";
import CustomDatePicker from "../Shared/customDatePicker";
import ImageUpload from "../Shared/imageUpload";
import { withFirebase } from "../Firebase";
import { UserContext } from "../Auth/UserContext";

const ModalGalleryBase = props => {
  const [show, setShow] = React.useState(false);
  const [user] = useContext(UserContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [galleryInfo, setGalleryInfo] = React.useState({
    title: "",
    description: "",
    send_date_time: "",
    content_type: "",
    push_notification: "",
    image_url: ""
  });

  const handleChange = e => {
    let form = {
      title: "",
      description: "",
      send_date_time: "",
      content_type: "",
      push_notification: "",
      image_url: ""
    };
    form = galleryInfo;
    if (e.target.id === "animal" || e.target.id === "activity") {
      form[e.target.name] = e.target.value;
    } else {
      form[e.target.id] = e.target.value;
    }
    console.log(form);
    setGalleryInfo(form);
  };

  const addGallery = () => {
    const { firebase } = props;
    firebase.doAddDoc("gallery", galleryInfo);
  };

  const getDate = date => {
    setGalleryInfo({
      ...galleryInfo,
      send_date_time: date
    });
  };
  const handleClick = () => {
    handleClose();
    addGallery();
  };
  const getImage = name => {
    setGalleryInfo({
      ...galleryInfo,
      image_url: name
    });
    console.log(galleryInfo);
  };

  return (
    <>
      {user.type === "admin" && (
        <AddItemButton addActivity={handleShow}></AddItemButton>
      )}
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Fotoğraf Ekle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleClick} id="galleryForm">
            <div className="form-group">
              <div className="custom-control custom-radio custom-control-inline">
                <input
                  type="radio"
                  id="animal"
                  name="content_type"
                  className="custom-control-input"
                  onChange={handleChange}
                  value="animal"
                />
                <label className="custom-control-label" htmlFor="animal">
                  Kampüs Hayvanlarımız
                </label>
              </div>
              <div className="custom-control custom-radio custom-control-inline">
                <input
                  type="radio"
                  id="activity"
                  name="content_type"
                  className="custom-control-input"
                  onChange={handleChange}
                  value="activity"
                />
                <label className="custom-control-label" htmlFor="activity">
                  Faaliyetlerimiz
                </label>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlInput1">Başlık</label>
              <input
                className="form-control"
                name="title"
                id="title"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea1">İçerik</label>
              <textarea
                className="form-control"
                name="description"
                id="description"
                type="text"
                rows="3"
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea1">Tarih</label>
              <br />
              <CustomDatePicker newDate={getDate}></CustomDatePicker>
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea1">
                Fotoğraf Yükle
              </label>
              <br />
              <ImageUpload
                image={getImage}
                firebase={props.firebase}
              ></ImageUpload>
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlSelect1">Bildirim Gönder</label>
              <select
                className="form-control"
                id="push_notification"
                onChange={handleChange}
              >
                <option defaultValue>Gönderme</option>
                <option value="everyone">Herkes</option>
                <option value="user">Üyeler</option>
              </select>
            </div>
            <Button variant="secondary" onClick={handleClose}>
              Kapat
            </Button>
            <Button variant="primary" onClick={handleClick}>
              Kaydet
            </Button>
          </form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

const ModalGallery = withFirebase(ModalGalleryBase);
export default ModalGallery;
