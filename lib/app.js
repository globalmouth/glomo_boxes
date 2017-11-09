/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/no-danger */
/* eslint-disable no-alert */
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import reactElementToJSXString from 'react-element-to-jsx-string';
import hljs from 'highlight.js';

import styles from './app.css';
import arrowRight from '../assets/ic_arrow_forward_black_24px.svg';

import {
   ShowcaseReel,
   Carousel,
   IconButton,
   Button,
   ShowcaseTile,
} from './index';

const ROOT = document.getElementById('root');

const TestContainer = ({ description, element }) => {
   const createMarkup = () => {
      const hl = hljs.highlight('html', elementString, true);
      return {
         __html: hl.value,
      };
   };

   const elementString = reactElementToJSXString(element, {
      showFunctions: true,
      tabStop: 3,
      useBooleanShorthandSyntax: false,
   });

   return (
      <div className={styles['test-container']}>
         <div className="header">
            <h2>{element.type.name}</h2>
            {description}
         </div>
         <div className="code">
            <h3>Code</h3>
            <pre>
               <code
                  className="language-html"
                  dangerouslySetInnerHTML={createMarkup()}
               />
            </pre>
         </div>
         <div className={styles.example}>
            <h3>Working example</h3>
            <div className={styles.component}>{element}</div>
         </div>
      </div>
   );
};

TestContainer.propTypes = {
   description: PropTypes.string.isRequired,
   element: PropTypes.element,
};

const renderComponent = (description, node) => {
   const mountElement = document.createElement('div');
   mountElement.className = 'mount-element';
   ROOT.appendChild(mountElement);

   ReactDOM.render(
      <TestContainer description={description} element={node} />,
      mountElement
   );
};

renderComponent(
   'Carousel component with default props showing 3x divs of block color.',
   <Carousel height={330}>
      <div style={{ width: '100%', height: '100%', backgroundColor: 'blue' }} />
      <div
         style={{ width: '100%', height: '100%', backgroundColor: 'green' }}
      />
      <div style={{ width: '100%', height: '100%', backgroundColor: 'red' }} />
   </Carousel>
);

renderComponent(
   'IconButton with material icons',
   <IconButton
      onMouseDown={e => {
         e.preventDefault();
         alert('IconButton onMouseDown: ' + e.target);
      }}
      onTouchStart={e => {
         e.preventDefault();
         alert('IconButton onTouchStart: ' + e.target);
      }}
      processing={false}
   >
      <img src={arrowRight} alt="arrow right" />
   </IconButton>
);

renderComponent(
   'Button with default primary actionType and styles',
   <Button
      // actionType='secondary'
      onMouseDown={e => {
         e.preventDefault();
         alert('Button onMouseDown: ' + e.target);
      }}
      onTouchStart={e => {
         e.preventDefault();
         alert('Button onTouchStart: ' + e.target);
      }}
      color={'#fff'}
      backgroundColor={'#003439'}
      style={{ fontSize: '18px' }}
   >
      I am a primary button
   </Button>
);

renderComponent(
   'Button with secondary actionType and styles',
   <Button
      actionType="secondary"
      onMouseDown={e => {
         e.preventDefault();
         alert('Button onMouseDown: ' + e.target);
      }}
      onTouchStart={e => {
         e.preventDefault();
         alert('Button onTouchStart: ' + e.target);
      }}
      color={'#fff'}
      backgroundColor={'#003439'}
      style={{ fontSize: '18px' }}
   >
      I am a secondary button
   </Button>
);

renderComponent(
   'ShowcaseTile component',
   <ShowcaseTile
      tileColor={'linear-gradient(149deg, #333333, #d27937)'}
      contentColor={'#fff'}
      title={'Title One'}
      tileIndex={1}
      excerpt={
         'Activated charcoal drinking vinegar fingerstache, stumptown ugh butcher organic PBR&B fashion axe tousled locavore. +1 viral iceland farm-to-table truffaut. Craft beer man bun keytar brunch chambray literally paleo small batch DIY iceland tbh cred palo santo tattooed.'
      }
   />
);

// Example
// render('ShowcaseReel Element', <ShowcaseReel value="showcase reel" />)

/**
 * DO NOT REMOVE
 * this is testing a testimonial component with the carousel
 */
// const Testimonial = () => (
//    <section className={styles.section}>
//       <Carousel
//          height={660}
//          autoPlay={true}
//          animationType='slide'
//          intervalDuration={6000}
//       >
//          <div className={styles['quote-wrapper']}>
//             <div className={styles.blockquote}>
//                Leggings yuccie truffaut synth, coloring book quinoa hashtag viral
//                banjo man braid raclette. Slow-carb actually selvage fam kale chips
//                organic cred trust fund post-ironic cloud bread ramps pug. Poutine
//                intelligentsia four dollar toast, marfa cliche af swag seitan mlkshk
//                portland thundercats green juice trust fund hammock. Skateboard
//                distillery poke, slow-carb chartreuse drinking vinegar la croix
//                quinoa hexagon selfies pop-up street art.
//             </div>
//          </div>
//          <div className={styles['quote-wrapper']}>
//             <div className={styles.blockquote}>
//                Occaecat ex duis ex elit irure quis pariatur tempor consequat
//                laboris magna magna ullamco. Incididunt exercitation sint laboris
//                exercitation voluptate velit esse voluptate laboris officia mollit.
//                Sunt amet anim aute officia deserunt occaecat ipsum ullamco
//                adipisicing cupidatat do.
//             </div>
//          </div>
//          <div className={styles['quote-wrapper']}>
//             <div className={styles.blockquote}>
//                Activated charcoal drinking vinegar fingerstache, stumptown ugh
//                butcher organic PBR&B fashion axe tousled locavore. +1 viral iceland
//                farm-to-table truffaut. Craft beer man bun keytar brunch chambray,
//                literally paleo small batch DIY iceland tbh cred palo santo
//                tattooed.
//             </div>
//          </div>
//       </Carousel>
//    </section>
// )

// Initialize highlighting of code
hljs.initHighlighting();