import { forwardRef, ElementType, ComponentPropsWithRef, ReactElement } from "react"
import { cn } from "~/lib/cn"

type PolymorphicRef<C extends ElementType> = ComponentPropsWithRef<C>["ref"]

type PolymorphicComponentProps<C extends ElementType, Props = {}> = {
  as?: C
  className?: string
} & Props &
  Omit<ComponentPropsWithRef<C>, keyof Props | "as" | "className">

interface ShimmerButtonOwnProps {
  shimmerColor?: string
  shimmerSize?: number
  borderRadius?: number
  shimmerDuration?: number
  background?: string
}

export type ShimmerButtonProps<C extends ElementType = "button"> = PolymorphicComponentProps<C, ShimmerButtonOwnProps>

export const ShimmerButton = forwardRef(function ShimmerButton<C extends ElementType = "button">(
  {
    as,
    className,
    shimmerColor = "#ffffff",
    shimmerSize = 0.1,
    borderRadius = 8,
    shimmerDuration = 1500,
    background = "rgba(239, 68, 68, 1)",
    style,
    children,
    ...props
  }: ShimmerButtonProps<C>,
  ref?: PolymorphicRef<C>
) {
  const Component = as || "button"
  const buttonStyle = {
    "--shimmer-color": shimmerColor,
    "--shimmer-size": shimmerSize,
    "--border-radius": `${borderRadius}px`,
    "--shimmer-duration": `${shimmerDuration}ms`,
    "--background": background,
    ...style,
  } as React.CSSProperties

  return (
    <Component
      ref={ref}
      className={cn(
        "relative inline-flex h-10 items-center justify-center overflow-hidden rounded-md px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50",
        className
      )}
      style={buttonStyle}
      {...props}
    >
      <div className="absolute inset-0" style={{ background: "var(--background)" }} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="h-[var(--shimmer-size)] w-[var(--shimmer-size)] animate-shimmer rounded-full bg-white/75 shadow-[0_0_10px_10px_rgba(255,255,255,0.25)]"
          style={{
            animation: `shimmer var(--shimmer-duration) cubic-bezier(0, 0, 0.12, 1) infinite`,
          }}
        />
      </div>
      <span className="relative z-10">{children}</span>
    </Component>
  )
}) 