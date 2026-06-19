import React from 'react'
import { motion } from 'framer-motion'

export default function ConicGradientAnimation({
  width,
  height,
  borderColor = "#ff00ff",
  animationDuration = 6,
  blurRadius = 2,
  borderRadius = 0,
  backgroundColor = "rgb(var(--text-primary) / 0.1)",
  overlayBorderColor = "transparent",
  overlayMargin = 1,
  text = "",
  textColor = "#000000",
  fontSize = 16,
  fontWeight = 400,
  fontFamily = "Inter",
  letterSpacing = 0,
  children,
  customGradient = null
}) {
  const gradientBackground = customGradient || `conic-gradient(transparent 200deg, ${borderColor})`;

  return (
    <div 
      className="conic-gradient-container"
      style={{
        width: width || "100%",
        height: height || "100%",
        position: "relative",
        overflow: "hidden",
        borderRadius: `${borderRadius}px`,
        minWidth: "12px",
        minHeight: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {/* Rotating Conic Gradient - Forced to be a perfect square based on 200% of parent width */}
      <motion.div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "200%",
          aspectRatio: "1/1",
          background: gradientBackground,
          zIndex: 1,
          transformOrigin: "center center",
        }}
        animate={{
          rotate: 360,
          x: "-50%",
          y: "-50%"
        }}
        initial={{
          rotate: 0,
          x: "-50%",
          y: "-50%"
        }}
        transition={{
          duration: animationDuration,
          ease: "linear",
          repeat: Infinity,
          repeatDelay: 0
        }}
      />

      {/* Inner Mask Overlay with Blur and Background */}
      <div 
        style={{
          position: "absolute",
          top: `${overlayMargin}px`,
          left: `${overlayMargin}px`,
          right: `${overlayMargin}px`,
          bottom: `${overlayMargin}px`,
          backdropFilter: blurRadius > 0 ? `blur(${blurRadius}px)` : "none",
          WebkitBackdropFilter: blurRadius > 0 ? `blur(${blurRadius}px)` : "none",
          backgroundColor: backgroundColor,
          border: overlayBorderColor !== "transparent" ? `1px solid ${overlayBorderColor}` : "none",
          borderRadius: `${Math.max(0, borderRadius - overlayMargin)}px`,
          zIndex: 2,
          pointerEvents: "none"
        }} 
      />

      {/* Content Container */}
      <div 
        style={{
          position: "relative",
          zIndex: 3,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {text && (
          <div style={{
            color: textColor,
            fontSize: `${fontSize}px`,
            fontWeight: fontWeight,
            fontFamily: fontFamily,
            letterSpacing: `${letterSpacing}px`,
            textAlign: "center",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "100%",
            userSelect: "none"
          }}>
            {text}
          </div>
        )}
        {children}
      </div>
    </div>
  )
}
