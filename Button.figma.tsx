const Button = defineComponentSet('Button', {
  size: ['Small', 'Medium', 'Large'] as const,
}, ({ size }) => {
  const px = size === 'Small' ? 12 : size === 'Medium' ? 16 : 24
  const py = size === 'Small' ? 6 : size === 'Medium' ? 10 : 14
  const fontSize = size === 'Small' ? 12 : size === 'Medium' ? 14 : 16
  const radius = size === 'Small' ? 6 : size === 'Medium' ? 8 : 10
  
  return (
    <Frame 
      style={{
        paddingLeft: px,
        paddingRight: px,
        paddingTop: py,
        paddingBottom: py,
        backgroundColor: '#3B82F6',
        borderRadius: radius,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: fontSize, fontWeight: 500, color: '#FFFFFF' }}>Button</Text>
    </Frame>
  )
})

<Button size="Small" />
