type Props = {
  children: any
}

function MainLayout({ children }: Props) {
  return (
    <div className='container mx-auto p-4 h-full'>
      {children}
    </div>
  )
}

export default MainLayout