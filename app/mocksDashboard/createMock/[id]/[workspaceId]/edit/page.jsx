import React from 'react'
import Form from '@app/ui/createMock/edit-form'

export default function page({params}) {
  return (
    <>
    <Form id={params.id} workspaceId={params.workspaceId} formTitle="Edit Mock" />
    </>
  )
}
