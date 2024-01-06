
interface ChildrenProps {
    children: React.ReactNode
}


const AuthLayout = ({ children }: ChildrenProps) => {
    return (
        <div className="h-full flex items-center justify-center">
            {children}
        </div>
    )
}

export default AuthLayout;