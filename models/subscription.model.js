import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Subscription name is required"],
        trim: true,
        minLength: 2,
        maxLength: 100,
    },
    price: {
        type: Number,
        required: [true, "Subscription price is required"],
        min: [0, "Subscription price must be greater than or equal to 0"],
        max: [1000, "Subscription price must be less than or equal to 1000"],
    },
    currency: {
        type: String,
        enum: ["USD", "EUR", "GBP"],
        default: 'USD',
        required: [true, "Subscription currency is required"],
    },
    frequency: {
        type: String,
        enum: ["daily", "weekly", "monthly", "yearly"],
        default: 'monthly',
        required: [true, "Subscription frequency is required"],
    },
    category: {
        type: String,
        enum: ["sports", "movies", "music", "news", "lifestyle", "kids", "other"],
        required: [true, "Subscription category is required"],
    },
    paymentMethod: {
        type: String,
        enum: ["credit card", "paypal", "crypto", "other"],
        required: [true, "Subscription payment methods are required"],
    },
    status: {
        type: String,
        enum: ["active", "inactive", "canceled", "expired"],
        default: 'active',
    },
    startDate: {
        type: Date,
        required: [true, "Subscription start date is required"],
        validate: {
            validator: value => value <= new Date(),
            message: "Subscription start date must be in the past"
        }
    },
    renewalDate: {
        type: Date,
        validate: {
            validator: function (value) {
                return value > this.startDate
            },
            message: "Subscription end date must be in the future"
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Subscription user is required"],
        index: true,
    }
}, { timestamps: true });

subscriptionSchema.pre('save', function (next) {
    if (!this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        }

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);

        if (this.renewalDate < new Date()) {
            this.status = "expired";
        }

        next();
    }
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;