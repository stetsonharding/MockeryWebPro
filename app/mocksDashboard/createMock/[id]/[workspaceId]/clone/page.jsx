import React from 'react'
import Form from '@app/ui/createMock/edit-form'

function page({params}) {
  return (
   <Form id={params.id} workspaceId={params.workspaceId} formTitle="Clone Mock" />
  )
}

export default page