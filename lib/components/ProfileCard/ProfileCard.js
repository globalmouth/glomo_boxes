import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './ProfileCard.css'
import Button from '../Button'

export default class ProfileCard extends Component {
   static defaultProps = {
      image: '',
      imageAlt: '',
      title: '',
      firstName: '',
      lastName: '',
      text: '',
      subTexts: [],
      phone: '',
      email: '',
      colorTheme: 'dark',
      backgroundColor: '#FFF',
      backgroundGradientColor: '',
      buttonColor: '#FFF',
   }
   static propTypes = {
      image: PropTypes.string,
      imageAlt: PropTypes.string,
      title: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      text: PropTypes.string,
      subTexts: PropTypes.array,
      phone: PropTypes.string,
      email: PropTypes.string,
      colorTheme: PropTypes.oneOf(['dark', 'light']),
      backgroundColor: PropTypes.string,
      backgroundGradientColor: PropTypes.string,
      buttonColor: PropTypes.string,
   }
   backgroundClass = (backgroundColor, backgroundGradientColor) => {
      if (backgroundGradientColor !== '') {
         return {
            backgroundImage: `linear-gradient(298deg, ${backgroundColor}, ${
               backgroundGradientColor
            })`,
         }
      } else {
         return {
            backgroundColor: backgroundColor,
         }
      }
   }
   textColor = colorTheme => {
      if (colorTheme === 'dark') {
         return '#000'
      } else if (colorTheme === 'light') {
         return '#FFF'
      }
   }
   render() {
      const {
         image,
         imageAlt,
         title,
         firstName,
         lastName,
         text,
         subTexts,
         phone,
         email,
         colorTheme,
         backgroundColor,
         backgroundGradientColor,
         buttonColor,
      } = this.props

      return (
         <div
            className={styles['profile-card']}
            style={this.backgroundClass(
               backgroundColor,
               backgroundGradientColor
            )}
         >
            <div className={styles['profile-card-inner']}>
               <div className={styles['image-container']}>
                  {/* <div
                     className={styles['image']}
                     style={{ backgroundImage: `url(${image})` }}
                  /> */}
                  <div className={styles['image-wrapper']}>
                     <img
                        className={styles['image']}
                        src={image}
                        alt={imageAlt}
                     />
                  </div>
               </div>
               <div
                  className={styles['text-container']}
                  style={{
                     color: this.textColor(colorTheme),
                  }}
               >
                  <span className={styles.title}>{title}</span>
                  <span className={styles.name}>{`${firstName} ${
                     lastName
                  }`}</span>
                  <dl>
                     <dt>
                        <span className={styles.text}>{text}</span>
                     </dt>
                     <ul className={styles['sub-text']}>
                        {subTexts.length > 0 &&
                           subTexts.map(text => {
                              return (
                                 <li key={text}>
                                    <span className={styles.text}>{text}</span>
                                 </li>
                              )
                           })}
                     </ul>
                  </dl>
                  <div className={`${styles['button-container']}`}>
                     <Button
                        type="a"
                        className="profile-button"
                        actionType="secondary"
                        href={`mailto:${email}`}
                        backgroundColor={buttonColor}
                        style={{ letterSpacing: '3px', padding: '8px 0' }}
                     >
                        {`email ${firstName}`}
                     </Button>
                     <Button
                        type="a"
                        className="profile-button"
                        actionType="primary"
                        href={`tel:${phone}`}
                        color={colorTheme == 'light' ? backgroundColor : '#FFF'}
                        backgroundColor={buttonColor}
                     >
                        {phone}
                     </Button>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}
