import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '../../app/store'
import { NoteForm } from '../NoteForm'
import { NoteList } from '../NoteList'
import { SearchBar } from '../SearchBar'
import { SortControl } from '../SortControl'
import { Footer } from '../Footer'
import { Header } from '../Header'

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="page-container">
          <Header />

          <div className="header-actions">
            <SearchBar />
            <SortControl />
          </div>

          <NoteForm />
          <NoteList />

          <Footer />
        </div>
      </PersistGate>
    </Provider>
  )
}
