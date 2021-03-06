import React, { Component } from 'react'
import PropType from 'prop-types'

import styles from './Button.css'
import ButtonBase from '../ButtonBase'

export default class Button extends Component {
   static defaultProps = {
      actionType: 'primary',
      fullWidth: false,
   }

   static propTypes = {
      ...ButtonBase.propTypes,
      children: PropType.node,
      style: PropType.shape({}),
      actionType: PropType.oneOf(['primary', 'secondary']),
      color: PropType.string,
      backgroundColor: PropType.string,
      fullWidth: PropType.bool,
   }

   constructor() {
      super()

      this.state = {
         active: false,
      }
   }

   handleActive = e => {
      this.setState({ active: true })
   }

   handleInactive = e => {
      this.setState({ active: false })
   }

   render() {
      const {
         children,
         style,
         actionType,
         backgroundColor,
         color,
         fullWidth,
         ...other
      } = this.props

      const paddingY = '8'
      const paddingX = Math.pow(paddingY, 1.618)

      const styleProp = {
         padding: `${paddingY}px ${paddingX}px`,
         border: `2px solid ${backgroundColor}`,
         backgroundColor,
         color,
      }

      if (actionType === 'secondary') {
         styleProp.color = backgroundColor
         styleProp.backgroundColor = 'transparent'
      }

      if (fullWidth) {
         styleProp['width'] = '100%'
      }

      return (
         <ButtonBase
            className={styles.root}
            onMouseEnter={this.handleActive}
            onMouseLeave={this.handleInactive}
            onTouchStart={this.handleActive}
            onTouchEnd={this.handleInactive}
            style={{ ...styleProp, ...style }}
            {...other}
         >
            <span className={styles.label}>{children}</span>
         </ButtonBase>
      )
   }
}
