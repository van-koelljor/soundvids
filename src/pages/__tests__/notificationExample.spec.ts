import NotificationExample from '../noticationExample.vue'
import { fireEvent } from '@testing-library/vue'
import { renderWithVuetify } from '@/../test/helpers'

describe('Notification Example', () => {
  it('Notify correctly', async () => {
    const { getByText, getByLabelText } = renderWithVuetify(NotificationExample)
    getByText('Notification Example')
    const input = getByLabelText("What's your name?")
    await fireEvent.update(input, 'Testname')

    const button = getByText('Confirm')
    await fireEvent.click(button)

    const store = useNotificationStore()
    expect(store.addNotification).toBeCalledWith('Hi, Testname!', 'success')
  })
})
