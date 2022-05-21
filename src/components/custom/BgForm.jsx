import { Portlet, Form, Input, Label, Progress, Container, Row, Col } from "@blueupcode/components";
import { useEffect, useState } from "react";
import { forwardRef, useImperativeHandle } from "react";
import { firebaseClient } from '@components/firebase/firebaseClient';
import 'firebase/storage'
import { toast } from "components/swal/instance"


const BgForm = forwardRef(({ handleImage } = props, ref) => {

  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState('');

  useImperativeHandle(ref, () => ({
    resetImageForm() {
      setUploadProgress(0);
      setImageUrl('');
      document.getElementById('surveyBg').value = '';
    },

    setImg(img) {
      setImageUrl(img);
    }
  }));

  useEffect(() => {
    handleImage(imageUrl);
    console.log(imageUrl);
  }, [imageUrl]);

  const validateFileType = (file) => {
    const validType = ['image/png', 'image/jpeg', 'image/jpg', 'image/bmp']
    if (!validType.includes(file.type)) {
      return false;
    } else {
      return true;
    }
  };

  const uploadImage = (e) => {
    const image = e.target.files[0];
    const storage = firebaseClient.storage();

    if (validateFileType(image)) {
      let task = storage
        .ref(`/bg/${image.name}`)
        .put(image);

      task.on('state_changed',
        (snap) => {
          let progress = (snap.bytesTransferred / snap.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          toast.fire({
            icon: "error",
            title: "Error en carga de imágen"
          });
          console.log(error);
        },
        () => {
          task.snapshot.ref.getDownloadURL().then((downloadURL) => {
            setImageUrl(downloadURL);
            toast.fire({
              icon: "success",
              title: "Imágen cargada exitosamente"
            });
          })
        }
      );
    } else {
      toast.fire({
        icon: "warning",
        title: "Formato de archivo no soportado"
      });
    }
  };

  return (
    <Portlet className="mt-4">
      <Portlet.Header bordered>
        <Portlet.Title>
          <span>Imágen de Fondo</span>
        </Portlet.Title>
      </Portlet.Header>
      <Portlet.Body>
        <Container className="p-0">
          <Row className="p-0">
            <Col>
              <Form.Group>
                <Label for="surveyBg">Seleccione imágen:</Label>

                <Progress variant={uploadProgress == 100 ? 'success' : 'secondary'} value={uploadProgress} className="mb-2">
                  {uploadProgress}%
                </Progress>


                <Input
                  type="file"
                  id="surveyBg"
                  accept="image/png, image/jpeg, image/bmp"
                  onChange={uploadImage}
                />
              </Form.Group>
            </Col>

          </Row>

          <Row>
            <Col>
              <div>
                {imageUrl != '' &&
                  <img className="h-75 w-75" src={imageUrl} />
                }
              </div>
            </Col>
          </Row>


        </Container>

      </Portlet.Body>
    </Portlet>
  )
});

export default BgForm;