import React from 'react';
import { motion } from 'framer-motion';

import './error-message.styles.scss';

const ErrorMessage = ({ message }) => {
    return (
        <motion.div
            className='error-message'
            initial={{ opacity: 0 }}
            animate={{ y: 5, opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {message}
        </motion.div>
    )
}

export default ErrorMessage;