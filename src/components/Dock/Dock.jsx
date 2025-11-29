import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { Children, cloneElement, useEffect, useMemo, useRef, useState } from 'react';
import './Dock.css';

// Device detection hook
const useDeviceType = () => {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  
  useEffect(() => {
    const checkDevice = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.matchMedia('(max-width: 1024px)').matches;
      setIsMobileOrTablet(hasTouch || isSmallScreen);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);
  
  return { isMobileOrTablet };
};

function DockItem({ children, className = '', onClick, isActive = false, mouseX, spring, distance, magnification, baseItemSize, isMobileOrTablet }) {
    const ref = useRef(null);
    const isHovered = useMotionValue(0);
    const staticHovered = useMotionValue(0);

    const mouseDistance = useTransform(mouseX, val => {
        if (isMobileOrTablet) return 0; // No distance calculation on mobile
        const rect = ref.current?.getBoundingClientRect() ?? {
            x: 0,
            width: baseItemSize
        };
        return val - rect.x - baseItemSize / 2;
    });

    const targetSize = useTransform(mouseDistance, 
        [-distance, 0, distance], 
        isMobileOrTablet ? [baseItemSize, baseItemSize, baseItemSize] : [baseItemSize, magnification, baseItemSize]
    );
    const size = useSpring(targetSize, isMobileOrTablet ? { mass: 0, stiffness: 0, damping: 1 } : spring);

    return (
        <motion.div
            ref={ref}
            style={{
                width: isMobileOrTablet ? baseItemSize : size,
                height: isMobileOrTablet ? baseItemSize : size
            }}
            onHoverStart={() => !isMobileOrTablet && isHovered.set(1)}
            onHoverEnd={() => !isMobileOrTablet && isHovered.set(0)}
            onFocus={() => !isMobileOrTablet && isHovered.set(1)}
            onBlur={() => !isMobileOrTablet && isHovered.set(0)}
            onClick={onClick}
            className={`dock-item ${className} ${isActive ? 'active' : ''} ${isMobileOrTablet ? 'mobile' : ''}`}
            tabIndex={0}
            role="button"
            aria-haspopup="true"
        >
            {Children.map(children, child => cloneElement(child, { isHovered: isMobileOrTablet ? staticHovered : isHovered }))}
        </motion.div>
    );
}

function DockLabel({ children, className = '', isMobileOrTablet, ...rest }) {
    const { isHovered } = rest;
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isMobileOrTablet) {
            setIsVisible(false); // Never show labels on mobile/tablet
            return;
        }
        
        const unsubscribe = isHovered.on('change', latest => {
            setIsVisible(latest === 1);
        });
        return () => unsubscribe();
    }, [isHovered, isMobileOrTablet]);

    if (isMobileOrTablet) return null; // Don't render labels on mobile/tablet

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: -10 }}
                    exit={{ opacity: 0, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`dock-label ${className}`}
                    role="tooltip"
                    style={{ x: '-50%' }}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function DockIcon({ children, className = '' }) {
    return <div className={`dock-icon ${className}`}>{children}</div>;
}

export default function Dock({
    items,
    activeView,
    className = '',
    spring = { mass: 0.1, stiffness: 150, damping: 12 },
    magnification = 70,
    distance = 200,
    panelHeight = 68,
    dockHeight = 256,
    baseItemSize = 50
}) {
    const { isMobileOrTablet } = useDeviceType();
    const mouseX = useMotionValue(Infinity);
    const isHovered = useMotionValue(0);

    const maxHeight = useMemo(
        () => {
            if (isMobileOrTablet) return panelHeight; // Fixed height on mobile
            return Math.max(dockHeight, magnification + magnification / 2 + 4);
        },
        [magnification, dockHeight, panelHeight, isMobileOrTablet]
    );
    const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
    const height = useSpring(heightRow, isMobileOrTablet ? { mass: 0, stiffness: 0, damping: 1 } : spring);

    return (
        <motion.div 
            style={{ height: isMobileOrTablet ? panelHeight + 16 : height, scrollbarWidth: 'none' }} 
            className={`dock-outer ${isMobileOrTablet ? 'mobile' : ''}`}
        >
            <motion.div
                onMouseMove={({ pageX }) => {
                    if (!isMobileOrTablet) {
                        isHovered.set(1);
                        mouseX.set(pageX);
                    }
                }}
                onMouseLeave={() => {
                    if (!isMobileOrTablet) {
                        isHovered.set(0);
                        mouseX.set(Infinity);
                    }
                }}
                className={`dock-panel ${className} ${isMobileOrTablet ? 'mobile' : ''}`}
                style={{ height: panelHeight }}
                role="toolbar"
                aria-label="Application dock"
            >
                {items.map((item, index) => (
                    <DockItem
                        key={index}
                        onClick={item.onClick}
                        className={item.className}
                        isActive={activeView === item.view}
                        mouseX={mouseX}
                        spring={spring}
                        distance={distance}
                        magnification={magnification}
                        baseItemSize={baseItemSize}
                        isMobileOrTablet={isMobileOrTablet}
                    >
                        <DockIcon>{item.icon}</DockIcon>
                        <DockLabel isMobileOrTablet={isMobileOrTablet}>{item.label}</DockLabel>
                    </DockItem>
                ))}
            </motion.div>
        </motion.div>
    );
}
