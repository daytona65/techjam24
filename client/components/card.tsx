import { View, Text, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { MotionStyle, motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import React from 'react';


const Card = () => {

    const motionValue = useMotionValue(0)

    const inputX = [-200, 200]
    const outputY = [-50, 50]
    let rotateValue = useTransform(motionValue, inputX, outputY)

    const opacityValue = useTransform( 
        motionValue, 
        [-200, -150, 0, 150, 200], 
        [0, 1, 1, 1, 0] 
    ); 

    const animControls = useAnimation(); 

    const cardStyle: MotionStyle = { 
        backgroundRepeat: "no-repeat", 
        backgroundSize: "contain", 
        backgroundColor: "#55ccff", 
        borderRadius: 20, 
        height: 300, 
        width: 150,
        x: motionValue,
        rotate: rotateValue,
        opacity: opacityValue,
        
    }; 

    return (
        <SafeAreaView >
            <motion.div 
                drag={'x'} 
                style={cardStyle} 
                dragConstraints={{ left: -1000, right: 1000 }}
                onDragEnd={
                    (event, info) => { 
                        // If the card is dragged only upto 150 on x-axis 
                        // bring it back to initial position 
                        if (Math.abs(info.point.x) <= 150) { 
                            animControls.start({ x: 0 }); 
                        } else { 
                            // If card is dragged beyond 150 
                            // make it disappear 
                            // making use of ternary operator 
                            animControls.start({ x: info.point.x < 0 ? -200 : 200 }); 
                        } 
                    }
                }
            >
                <div style={{display: 'flex', height: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Video Feed</Text>
                    <Text>Hello</Text>
                </div>
            </motion.div>
        </SafeAreaView>
    );
}

export default Card;