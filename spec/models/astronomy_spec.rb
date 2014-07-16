require 'rails_helper'

RSpec.describe Astronomy, :type => :model do

  it 'initializes with an options instance variable' do
    astronomy = Astronomy.new({this: 'is in the @options int. variable'})
    actual = astronomy.instance_variable_names[0]
    expected = '@options'
    expect(actual). to eq(expected)
  end

end
