import React, {Component} from 'react';
import emailjs from 'emailjs-com';
import {notification as NotificationBox,} from "antd";

import './contact.css';

const openNotification = (title, message, type) => {
  NotificationBox[type]({
    message: title,
    description: message,
    placement: "bottomLeft"
  });
};
class Contact extends Component {
  constructor(props) {
    super(props);

    this.sendEmail = this.sendEmail.bind(this);
    this.resetForm = this.resetForm.bind(this);
     this.handleChange = this.handleChange.bind(this);
  }
  resetForm() {
    this.setState({
        user_name: '',
        user_email: '',
        message: '',
    }, () => {
      document.getElementById("contact-form").reset();
    })
  }
  sendEmail =(e) => {
    e.preventDefault();

    const { user_name, user_email, message } = this.state

    let templateParams = {
      from_name: user_name,
      to_name: 'Admin',//user_email,
      message_html: message,
      reply_to:user_email
    }  

    emailjs.send('gmail','template_nvAz26LU' ,templateParams, 'user_ZiADeXR9LP1vR2uWxJuJW')
    .then((result) => {
      openNotification(
        "İşlem Başarılı",
        "Mesajın iletildi. En kısa sürede geri dönüş sağlayacağız.",
        "success"
      );
      this.resetForm();

    }, (error) => {
        console.log(error.text);
    });
    


 }


  
  handleChange = (param, e) => {
    this.setState({ [param]: e.target.value })
  }


  render() {
    return (
    <div className="container-fluid">  
      <div className="row"> 
        <div className="col-sm-6">                 
          <h4>Adres</h4>
          <div className="pfblock-line"></div>
            <p className="lead">
              İstanbul Teknik Üniversitesi Maslak<br/>
              Kültür Sanat Binası<br/>
            </p>
            <br/>
            <br/>
            <div className="col">
              <p className="follow">Takipte Kalın! </p>   
            </div>
            <div className="row">
              <div className="col">                 
                <a target="_blank" href="https://twitter.com/itulupatiler"><img className="socialLogo" src={require('./../Res/images/twitterLogo.png')} alt="Ver Bi Pati"/></a>    
              </div>
              <div className="col">                 
                <a target="_blank" href="https://www.instagram.com/itulupatiler/? hl=tr"><img className="socialLogo" src={require('./../Res/images/instagramLogo.png')} alt="Ver Bi Pati"/></a>    
              </div>
            </div>
            <br></br><br></br><br></br>
            <p className="mail">Aklınıza takılan her şeyi sormak için <span id="mailaddress">itulupatiler@gmail.com</span></p>
          </div>     
          {/* Burasi nasil 2. column olur */}
          <div className="col-sm-6">
            <h4>İletişim Formu</h4>    
            <div className="pfblock-line"></div>  
            <form className="contact-form" id="contact-form" onSubmit={this.sendEmail}>
              <input type="hidden" name="contact_number"/>
                <div className="col">
                  <input type="text" name="user_name" className="form-control" placeholder="Ad-Soyad" onChange={this.handleChange.bind(this, 'user_name')}/>
                </div>
                <br/>
                <div className="col">
                  <input type="email" id="user_email"name="user_email" className="form-control" placeholder="E-mail" onChange={this.handleChange.bind(this, 'user_email')}/>
                </div>   
                <br/>   
                <div className="form-group col">
                  <textarea className="form-control"  name="message" placeholder="Mesajınız" id="exampleFormControlTextarea1" rows="6" onChange={this.handleChange.bind(this, 'message')}></textarea>
                </div>    
                <input id="contactForm" value="Gönder" type="submit"/>              
            </form> 
          </div>
        </div>
      </div>
    )
  }
}
export default Contact;