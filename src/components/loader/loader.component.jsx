import React from 'react';
import { motion } from 'framer-motion';

import './loader.styles.css';

const loaderContainerVariants = {
    start: {
        transition: {
            staggerChildren: 0.1
        }
    },
    end: {
        transition: {
            staggerChildren: 0.1
        }
    }
}

const loaderCircleVariants = {
    start: {
        y: '0%'
    },
    end: {
        y: '100%'
    }
}

const loaderCircleTransition = {
    duration: 0.4,
    yoyo: Infinity,
    ease: 'easeInOut'
}

const Loader = () => {
    return (
        <motion.div
            className='loader-container'
            variants={loaderContainerVariants}
            initial='start'
            animate='end'
        >
            <motion.span
                className='loader-circle'
                variants={loaderCircleVariants}
                transition={loaderCircleTransition}
            />
            <motion.span
                className='loader-circle'
                variants={loaderCircleVariants}
                transition={loaderCircleTransition}
            />
            <motion.span
                className='loader-circle'
                variants={loaderCircleVariants}
                transition={loaderCircleTransition}
            />
        </motion.div>
    )
}

export default Loader;