import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

type tokenTypes = {
  image: string
  id: string
  name: string
}

const Token = ({ image, name, id }: tokenTypes) => {
  return (
    <div>
      <Link href={`/token/${id}`}>
        <a>
          <Image
            src={image}
            // layout="responsive"
            width={300}
            height={300}
            alt={name}
          />
          <h3>{name}</h3>
        </a>
      </Link>
    </div>
  )
}

export default Token
