import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const PixelBlast = ({
  variant = 'circle',
  pixelSize = 6,
  color = '#B19EEF',
  patternScale = 3,
  patternDensity = 1.2,
  pixelSizeJitter = 0.5,
  enableRipples = false,
  rippleSpeed = 0.4,
  rippleThickness = 0.12,
  rippleIntensityScale = 1.5,
  liquid = false,
  liquidStrength = 0.12,
  liquidRadius = 1.2,
  liquidWobbleSpeed = 5,
  speed = 0.6,
  edgeFade = 0.25,
  transparent = false,
}) => {
  const containerRef = useRef(null)
  const sceneRef = useRef(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const renderer = new THREE.WebGLRenderer({ 
      alpha: transparent,
      antialias: false 
    })
    
    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight
    
    renderer.setSize(width, height)
    renderer.setPixelRatio(window.devicePixelRatio)
    container.appendChild(renderer.domElement)

    // Bayer matrix for dithering
    const bayerMatrix = [
      0, 8, 2, 10,
      12, 4, 14, 6,
      3, 11, 1, 9,
      15, 7, 13, 5
    ]

    // Convert hex color to RGB
    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result ? {
        r: parseInt(result[1], 16) / 255,
        g: parseInt(result[2], 16) / 255,
        b: parseInt(result[3], 16) / 255
      } : { r: 1, g: 1, b: 1 }
    }

    const rgb = hexToRgb(color)

    // Shader material
    const material = new THREE.ShaderMaterial({
      transparent: transparent,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(width, height) },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uPixelSize: { value: pixelSize },
        uColor: { value: new THREE.Vector3(rgb.r, rgb.g, rgb.b) },
        uPatternScale: { value: patternScale },
        uPatternDensity: { value: patternDensity },
        uPixelSizeJitter: { value: pixelSizeJitter },
        uEnableRipples: { value: enableRipples ? 1.0 : 0.0 },
        uRippleSpeed: { value: rippleSpeed },
        uRippleThickness: { value: rippleThickness },
        uRippleIntensityScale: { value: rippleIntensityScale },
        uLiquid: { value: liquid ? 1.0 : 0.0 },
        uLiquidStrength: { value: liquidStrength },
        uLiquidRadius: { value: liquidRadius },
        uLiquidWobbleSpeed: { value: liquidWobbleSpeed },
        uSpeed: { value: speed },
        uEdgeFade: { value: edgeFade },
        uVariant: { value: variant === 'circle' ? 0.0 : 1.0 },
        uBayerMatrix: { value: bayerMatrix }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec2 uResolution;
        uniform vec2 uMouse;
        uniform float uPixelSize;
        uniform vec3 uColor;
        uniform float uPatternScale;
        uniform float uPatternDensity;
        uniform float uPixelSizeJitter;
        uniform float uEnableRipples;
        uniform float uRippleSpeed;
        uniform float uRippleThickness;
        uniform float uRippleIntensityScale;
        uniform float uLiquid;
        uniform float uLiquidStrength;
        uniform float uLiquidRadius;
        uniform float uLiquidWobbleSpeed;
        uniform float uSpeed;
        uniform float uEdgeFade;
        uniform float uVariant;
        uniform float uBayerMatrix[16];
        
        varying vec2 vUv;
        
        float getBayer(vec2 coord) {
          int x = int(mod(coord.x, 4.0));
          int y = int(mod(coord.y, 4.0));
          int index = y * 4 + x;
          return uBayerMatrix[index] / 16.0;
        }
        
        float noise(vec2 p) {
          return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
        }
        
        void main() {
          vec2 uv = vUv;
          vec2 aspectUv = uv;
          aspectUv.x *= uResolution.x / uResolution.y;
          
          // Liquid distortion
          if (uLiquid > 0.5) {
            vec2 toMouse = aspectUv - vec2(uMouse.x * uResolution.x / uResolution.y, uMouse.y);
            float dist = length(toMouse);
            
            if (dist < uLiquidRadius) {
              float wobble = sin(uTime * uLiquidWobbleSpeed + dist * 10.0) * 0.5 + 0.5;
              float strength = (1.0 - dist / uLiquidRadius) * uLiquidStrength * wobble;
              aspectUv += normalize(toMouse) * strength;
            }
          }
          
          // Center point
          vec2 center = vec2(0.5 * uResolution.x / uResolution.y, 0.5);
          vec2 toCenter = aspectUv - center;
          float distFromCenter = length(toCenter);
          
          // Pattern generation with animation
          float pattern = sin(distFromCenter * uPatternScale + uTime * uSpeed) * 0.5 + 0.5;
          pattern = pow(pattern, uPatternDensity);
          
          // Ripple effect
          if (uEnableRipples > 0.5) {
            float ripple = sin(distFromCenter * 20.0 - uTime * uRippleSpeed * 10.0);
            ripple = smoothstep(uRippleThickness, 0.0, abs(ripple));
            pattern += ripple * uRippleIntensityScale;
          }
          
          // Edge fade
          float edgeFade = 1.0;
          if (uVariant < 0.5) {
            // Circle variant
            float maxDist = 0.5;
            edgeFade = smoothstep(maxDist, maxDist - uEdgeFade, distFromCenter);
          } else {
            // Rectangle variant
            float distX = abs(uv.x - 0.5);
            float distY = abs(uv.y - 0.5);
            float maxDist = 0.5;
            edgeFade = smoothstep(maxDist, maxDist - uEdgeFade, max(distX, distY));
          }
          
          pattern *= edgeFade;
          
          // Pixelate
          vec2 pixelUv = floor(uv * uResolution / uPixelSize) * uPixelSize;
          
          // Add jitter
          float jitter = noise(pixelUv) * uPixelSizeJitter;
          pattern += jitter;
          
          // Bayer dithering
          vec2 bayerCoord = floor(gl_FragCoord.xy / (uPixelSize * 0.5));
          float threshold = getBayer(bayerCoord);
          
          float dithered = step(threshold, pattern);
          
          // Output
          vec3 finalColor = uColor * dithered;
          float alpha = dithered * edgeFade;
          
          gl_FragColor = vec4(finalColor, alpha);
        }
      `
    })

    // Create plane mesh
    const geometry = new THREE.PlaneGeometry(2, 2)
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    sceneRef.current = { scene, camera, renderer, material, mesh }

    // Mouse move handler
    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect()
      mouseRef.current = {
        x: (event.clientX - rect.left) / rect.width,
        y: 1.0 - (event.clientY - rect.top) / rect.height
      }
    }

    container.addEventListener('mousemove', handleMouseMove)

    // Animation loop
    let animationFrameId
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      
      material.uniforms.uTime.value += 0.016
      material.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y)
      
      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      const newWidth = container.clientWidth
      const newHeight = container.clientHeight
      
      renderer.setSize(newWidth, newHeight)
      material.uniforms.uResolution.value.set(newWidth, newHeight)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      container.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
      
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [
    variant, pixelSize, color, patternScale, patternDensity, pixelSizeJitter,
    enableRipples, rippleSpeed, rippleThickness, rippleIntensityScale,
    liquid, liquidStrength, liquidRadius, liquidWobbleSpeed,
    speed, edgeFade, transparent
  ])

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
}

export default PixelBlast

